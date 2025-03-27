import { Router, Request, Response } from "express";

const router = Router();

// Mock database of medications
const mockMedicationDatabase: Record<string, any> = {
  "acetaminophen": {
    available: true,
    locations: ["Pharmacy A", "Pharmacy B", "Pharmacy C"],
    alternatives: ["ibuprofen", "naproxen"],
    nearbyPharmacies: [
      {
        name: "Health Pharmacy",
        distance: "0.8 miles",
        address: "123 Main St, City",
        contact: "555-123-4567",
      },
      {
        name: "MediCare Plus",
        distance: "1.2 miles",
        address: "456 Oak Ave, City",
        contact: "555-987-6543",
      },
    ],
    alternativeMedications: ["Acetaminophen", "Naproxen"],
  },
};

// Route to check medication availability
router.get(
  "/availability/:medication",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { medication } = req.params;

      if (!medication) {
        res.status(400).json({ message: "Medication name is required" });
        return;
      }

      const medicationData = mockMedicationDatabase[medication.toLowerCase()];
      if (!medicationData) {
        res.status(404).json({ message: "Medication not found" });
        return;
      }

      res.status(200).json(medicationData);
    } catch (error) {
      console.error("Error checking medication availability:", error);
      res.status(500).json({ message: "Error processing your request" });
    }
  }
);

// Route to get medication details from the dataset
router.get(
  "/details/:medication",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { medication } = req.params;

      if (!medication) {
        res.status(400).json({ message: "Medication name is required" });
        return;
      }

      const medicationDetails = {
        name: medication,
        category: "NSAID",
        uses: ["Pain relief", "Fever reduction", "Anti-inflammatory"],
        sideEffects: ["Stomach upset", "Heartburn", "Dizziness (rare)"],
        contraindications: [
          "Allergy to NSAIDs",
          "History of stomach ulcers",
          "Severe kidney disease",
        ],
        dosageInstructions:
          "Take 1 tablet (400mg) every 6-8 hours with food. Do not exceed 3 tablets in 24 hours.",
        interactions: [
          "Aspirin",
          "Blood thinners",
          "Some high blood pressure medications",
        ],
      };

      res.status(200).json(medicationDetails);
    } catch (error) {
      console.error("Error fetching medication details:", error);
      res.status(500).json({ message: "Error processing your request" });
    }
  }
);

export { router as medicationsRouter };