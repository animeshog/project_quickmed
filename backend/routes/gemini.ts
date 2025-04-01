import { Request, Response, Router } from "express";
import askGemini from "../controllers/geminiControllers";
import multer from "multer";
import path from "path";

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
    const prompt = `Analyze these symptoms and respond ONLY with cause and brief explanation in this exact format: [Cause] | [Brief Explanation]. No other text.
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
    console.error("Cause analysis error:", error);
    res.status(500).json({
      message: "Failed to analyze cause",
    });
  }
});

// Endpoint for treatment options
router.post("/treatment", async (req: Request, res: Response) => {
  try {
    const prompt = `Based on these symptoms, list ONLY treatment steps. No introductions or other text:
Symptoms: ${(req.body.symptoms as string[]).join(", ")}

1.
2.
3.`;

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
    const prompt = `List medications for these symptoms. Respond ONLY with medicines and dosages in this format:
Symptoms: ${(req.body.symptoms as string[]).join(", ")}

- [Medicine Name] | [Dosage] | [Duration]
- [Medicine Name] | [Dosage] | [Duration]

No other text.`;

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
    const prompt = `Provide home remedies for these symptoms. List ONLY remedies in this format:
Symptoms: ${(req.body.symptoms as string[]).join(", ")}

1. [Remedy] | [Instructions]
2. [Remedy] | [Instructions]

No other text.`;

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

      const fileContent = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;

      const geminiResponse = await askGemini(
        `Analyze this medical report and provide findings in this format:
      KEY FINDINGS:
      - List main observations
      
      DIAGNOSIS:
      - Primary diagnosis
      - Secondary conditions
      
      RECOMMENDATIONS:
      - Treatment plan
      - Follow-up steps`,
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