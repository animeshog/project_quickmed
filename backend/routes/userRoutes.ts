import express, { Router } from 'express';
// import { Register,Login } from '../controllers/userControllers';
import { Register, Login,Info } from '../controllers/userControllers';

const userRouter = Router();


userRouter.post("/register",Register);
userRouter.post("/login",Login);
userRouter.get("/info",Info);

export default userRouter;