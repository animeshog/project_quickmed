import { Request, Response, Router } from "express";
import askGemini from "../controllers/geminiControllers"; // Ensure this path is correct

const router = Router();

// Helper function to format patient details and symptoms

// Endpoint for potential cause
router.post("/cause", async (req: Request, res: Response) => {
  try {

    
    const geminiResponse = await askGemini(
      `I have these symptoms in India. Not a doctor? Fine, just give one potential cause, India-specific. No disclaimers, no fluff.`,
      (req.body.symptoms as string[]).join(", ")
    );

    console.log(geminiResponse);
    res.status(200).json({
      responseText: geminiResponse,
      message: "Good",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Not Good",
    });
  }
});

// Endpoint for treatment options
router.post("/treatment", async (req: Request, res: Response) => {
  try {
    

    
    const geminiResponse = await askGemini(
      `I have these symptoms in India. One treatment option, India-specific,  No disclaimers, no fluff.`,
      (req.body.symptoms as string[]).join(", ")
    );

    console.log(geminiResponse);
    res.status(200).json({
      responseText: geminiResponse,
      message: "Good",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Not Good",
    });
  }
});

// Endpoint for medication suggestions
router.post("/medication", async (req: Request, res: Response) => {
  try {


    const geminiResponse = await askGemini(
      `I have these symptoms in India. One Indian medication,  No disclaimers, no fluff.`,
      (req.body.symptoms as string[]).join(", ")
    );

    console.log(geminiResponse);
    res.status(200).json({
      responseText: geminiResponse,
      message: "Good",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Not Good",
    });
  }
});

// Endpoint for home remedies
router.post("/home-remedies", async (req: Request, res: Response) => {
  try {
  
    const geminiResponse = await askGemini(
      `I have these symptoms in India. One Indian home remedy. No disclaimers, no fluff.`,
      (req.body.symptoms as string[]).join(", ")
    );

    console.log(geminiResponse);
    res.status(200).json({
      responseText: geminiResponse,
      message: "Good",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Not Good",
    });
  }
});

export { router as GeminiRouter };