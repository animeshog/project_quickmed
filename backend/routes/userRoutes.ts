import express, { Router } from 'express';
// import { Register,Login } from '../controllers/userControllers';
import { Register, Login } from '../controllers/userControllers';

const userRouter = Router();


userRouter.post("/register",Register);
userRouter.post("/login",Login);

export default userRouter;