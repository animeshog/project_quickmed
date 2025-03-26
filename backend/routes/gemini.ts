import { Request, Response, Router } from "express";
import askGemini from "../controllers/geminiControllers"; // Ensure this path is correct

const router = Router();

// Helper function to format patient details and symptoms
const formatInput = (patientDetails: { [key: string]: string }, symptoms: string[]): string => {
  const detailsString = Object.entries(patientDetails)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");
  const symptomsString = symptoms.join(", ");
  return `Demographics: ${detailsString}. Symptoms: ${symptomsString}.`;
};

// Endpoint for potential cause
router.post("/cause", async (req: Request, res: Response) => {
  try {
    const patientDetails: { [key: string]: string } = req.body.patientDetails;
    const symptoms: string[] = req.body.symptoms;

    const input = formatInput(patientDetails, symptoms);
    const geminiResponse = await askGemini(
      `I have these symptoms in India. Not a doctor? Fine, just give one potential cause, India-specific, in 30 words max. No disclaimers, no fluff.`,
      input
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
    const patientDetails: { [key: string]: string } = req.body.patientDetails;
    const symptoms: string[] = req.body.symptoms;

    const input = formatInput(patientDetails, symptoms);
    const geminiResponse = await askGemini(
      `I have these symptoms in India. One treatment option, India-specific, 30 words max. No disclaimers, no fluff.`,
      input
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
    const patientDetails: { [key: string]: string } = req.body.patientDetails;
    const symptoms: string[] = req.body.symptoms;

    const input = formatInput(patientDetails, symptoms);
    const geminiResponse = await askGemini(
      `I have these symptoms in India. One Indian medication, 30 words max. No disclaimers, no fluff.`,
      input
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
    const patientDetails: { [key: string]: string } = req.body.patientDetails;
    const symptoms: string[] = req.body.symptoms;

    const input = formatInput(patientDetails, symptoms);
    const geminiResponse = await askGemini(
      `I have these symptoms in India. One Indian home remedy, 30 words max. No disclaimers, no fluff.`,
      input
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