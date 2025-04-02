import { Request, Response, Router } from "express";
import askGemini from "../controllers/geminiControllers";
import multer from "multer";
import { processFile } from "../services/pdfService";

// Update multer configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only JPEG, PNG and PDF files are allowed."
        )
      );
    }
  },
});

const router = Router();

// Helper function to format patient details and symptoms

// Endpoint for potential cause
router.post("/cause", async (req: Request, res: Response) => {
  try {
    const prompt = `Give a short, direct analysis of these symptoms in exactly this format:
PRIMARY CAUSE: [one line cause]
BRIEF EXPLANATION: [2-3 lines max]

Symptoms: ${(req.body.symptoms as string[]).join(", ")}`;

    const geminiResponse = await askGemini(prompt);

    res.status(200).json({
      responseText: geminiResponse,
      message: "Success",
    });
  } catch (error) {
    console.error("Cause analysis error:", error);
    res.status(500).json({
      message: "Failed to analyze cause",
    });
  }
});

// Endpoint for treatment options
router.post("/treatment", async (req: Request, res: Response) => {
  try {
    const prompt = `List 3 key treatment steps for these symptoms in bullet points. Keep each point to one line:

• [Step 1]
• [Step 2]
• [Step 3]

Symptoms: ${(req.body.symptoms as string[]).join(", ")}`;

    const geminiResponse = await askGemini(
      prompt,
      (req.body.symptoms as string[]).join(", ")
    );

    res.status(200).json({
      responseText: geminiResponse,
      message: "Treatment analysis completed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to analyze treatment options",
    });
  }
});

// Endpoint for medication suggestions
router.post("/medication", async (req: Request, res: Response) => {
  try {
    const prompt = `List only 2 most relevant medications with basic info in this exact format:

1. [Medicine Name] | [Dosage] | [Duration]
2. [Medicine Name] | [Dosage] | [Duration]

Symptoms: ${(req.body.symptoms as string[]).join(", ")}`;

    const geminiResponse = await askGemini(
      prompt,
      req.body.symptoms.join(", ")
    );

    res.status(200).json({
      responseText: geminiResponse,
      message: "Success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to retrieve medication suggestions",
    });
  }
});

// Endpoint for home remedies
router.post("/home-remedies", async (req: Request, res: Response) => {
  try {
    const prompt = `Give 2 simple home remedies for these symptoms. Format as:

1. [Remedy] | [Brief instructions]
2. [Remedy] | [Brief instructions]

Symptoms: ${(req.body.symptoms as string[]).join(", ")}`;

    const geminiResponse = await askGemini(
      prompt,
      (req.body.symptoms as string[]).join(", ")
    );

    res.status(200).json({
      responseText: geminiResponse,
      message: "Home remedies analysis completed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to analyze home remedies",
    });
  }
});

// Add new endpoint to save consultation history
router.post("/save-history", async (req: Request, res: Response) => {
  try {
    const { userId, symptoms, results } = req.body;

    const history = new History({
      userId,
      symptoms,
      diagnosis: results.cause,
      treatment: results.treatment,
      medications: results.medication,
      homeRemedies: results.homeRemedies,
      fileAnalysis: results.fileAnalysis,
    });

    await history.save();
    res
      .status(201)
      .json({ success: true, message: "History saved successfully" });
  } catch (error) {
    console.error("Error saving history:", error);
    res.status(500).json({ success: false, message: "Failed to save history" });
  }
});

router.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file received",
        });
      }

      console.log("Processing file:", {
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
      });

      const fileContent = await processFile(req.file);
      console.log("File content extracted successfully");

      const geminiResponse = await askGemini(
        `Analyze this medical report considering Indian healthcare standards and practices:

      KEY FINDINGS:
      - Important observations (use Indian normal ranges where applicable)
      
      DIAGNOSIS:
      - Primary diagnosis with reference to prevalence in Indian population
      - Secondary conditions common in Indian context
      
      RECOMMENDATIONS:
      - Treatment options available in India
      - Follow-up steps considering Indian healthcare system
      - Lifestyle modifications suitable for Indian context`,
        fileContent
      );

      return res.status(200).json({
        success: true,
        responseText: geminiResponse,
      });
    } catch (error) {
      console.error("File analysis error:", error);
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to analyze file",
      });
    }
  }
);

export { router as GeminiRouter };