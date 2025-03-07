
import express, { Router } from "express";
import gptRoutes from "./routes/gpt";
import medicationsRoutes from "./routes/medications";

const router = Router();

router.use("/gpt", gptRoutes);
router.use("/medications", medicationsRoutes);

export default router;
