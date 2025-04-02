import express, { Router, RequestHandler } from "express";
import { Register, Login, Info } from "../controllers/userControllers";
import { isAuthanticatedUser } from "../middlewares";
import { CustomRequest } from "../types";

const userRouter = Router();

userRouter.post("/register", Register);
userRouter.post("/login", Login); // Add this line to ensure login route exists
userRouter.get("/info", isAuthanticatedUser, Info);

export default userRouter;
