import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { medicationsRouter } from "./routes/medications";
import { GeminiRouter } from "./routes/gemini";
const app = express();
const PORT = process.env.PORT || 5000;
import { connectDatabse } from "./config/connection";
import userRouter from "./routes/userRoutes";


connectDatabse()

app.use(cors());
app.use(express.json());

app.use("/api/medications", medicationsRouter);
app.use("/api/gemini",GeminiRouter );

app.use("/api/auth",userRouter)

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: "An unexpected error occurred",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;