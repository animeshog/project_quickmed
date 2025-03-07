
import { Router, Request, Response } from "express";

const router = Router();

// This route would check medication availability from a dataset or external API
router.get("/check-availability/:medication", async (req: Request, res: Response) => {
  try {
    const { medication } = req.params;
    const { location } = req.query;
    
    // Mock database of medications
    const mockMedicationDatabase: Record<string, any> = {
      "acetaminophen": {
        available: true,
        locations: ["Pharmacy A", "Pharmacy B", "Pharmacy C"],
        alternatives: ["ibuprofen", "naproxen"]
      },
      "ibuprofen": {
        available: true,
        locations: ["Pharmacy A", "Pharmacy D"],
        alternatives: ["acetaminophen", "naproxen"]
      },
      "amoxicillin": {
        available: false,
        locations: [],
        alternatives: ["azithromycin", "cephalexin"]
      }
    };
    
    // Simulate database lookup
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const medicationKey = medication.toLowerCase();
    const medicationInfo = mockMedicationDatabase[medicationKey];
    
    if (medicationInfo) {
      return res.status(200).json({
        medication,
        ...medicationInfo,
        locationSpecific: location ? 
          medicationInfo.locations.includes(location as string) : 
          null
      });
    } else {
      return res.status(404).json({
        error: "Medication not found",
        medication
      });
    }
  } catch (error) {
    console.error("Error checking medication availability:", error);
    return res.status(500).json({ 
      error: "Failed to check medication availability", 
      details: error instanceof Error ? error.message : "Unknown error" 
    });
  }
});

// Route to get medication details from the dataset
router.get("/details/:medication", async (req: Request, res: Response) => {
  try {
    const { medication } = req.params;
    
    // Mock medication details database
    const mockMedicationDetails: Record<string, any> = {
      "acetaminophen": {
        genericName: "Acetaminophen",
        brandNames: ["Tylenol", "Panadol"],
        category: "Analgesic",
        usedFor: ["Pain relief", "Fever reduction"],
        sideEffects: ["Liver damage (at high doses)", "Nausea", "Rash"],
        interactions: ["Alcohol", "Warfarin"],
        dosage: "Adults: 325-650mg every 4-6 hours as needed, not exceeding 3000mg per day"
      },
      "ibuprofen": {
        genericName: "Ibuprofen",
        brandNames: ["Advil", "Motrin"],
        category: "NSAID",
        usedFor: ["Pain relief", "Inflammation", "Fever reduction"],
        sideEffects: ["Stomach upset", "Heartburn", "Dizziness"],
        interactions: ["Aspirin", "Blood thinners", "Some antidepressants"],
        dosage: "Adults: 200-400mg every 4-6 hours as needed, not exceeding 1200mg per day"
      }
    };
    
    // Simulate database lookup
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const medicationKey = medication.toLowerCase();
    const details = mockMedicationDetails[medicationKey];
    
    if (details) {
      return res.status(200).json({
        medication,
        details
      });
    } else {
      return res.status(404).json({
        error: "Medication details not found",
        medication
      });
    }
  } catch (error) {
    console.error("Error fetching medication details:", error);
    return res.status(500).json({ 
      error: "Failed to fetch medication details", 
      details: error instanceof Error ? error.message : "Unknown error" 
    });
  }
});

export default router;
