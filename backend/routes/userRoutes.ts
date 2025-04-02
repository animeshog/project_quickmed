import express, { Router } from "express";
import { Register, Login, Info } from "../controllers/userControllers";
import { isAuthanticatedUser } from "../middlewares";
import History from "../models/historySchema";

const userRouter = Router();

userRouter.post("/register", Register);
userRouter.post("/login", Login); // Add this line to ensure login route exists
userRouter.get("/info", isAuthanticatedUser, Info);

// Add history endpoints
userRouter.get("/chat-history", isAuthanticatedUser, async (req: any, res) => {
  try {
    const history = await History.find({ userId: req.user._id })
      .sort({ date: -1 })
      .limit(10);

    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ message: "Failed to fetch history" });
  }
});

export default userRouter;
