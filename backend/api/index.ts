import cors from "cors";
import express, { Router } from "express";
import { gptRouter } from "./routes/gpt";
import { medicationsRouter } from "./routes/medications";

const router = Router();

// Apply middleware
router.use(express.json());
router.use(cors());

// Register routes
router.use("/gpt", gptRouter);
router.use("/medications", medicationsRouter);

export default router;
