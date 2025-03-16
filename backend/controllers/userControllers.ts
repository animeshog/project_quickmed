import { Request, Response } from "express";
import User from "../models/userSchema";
import bcrypt from "bcrypt";
import { registerSchema, loginSchema } from "../schemas/userSchema";
import z from "zod";
import sendToken  from '../utils/sendToken';

async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = registerSchema.parse(req.body);
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const userToken = sendToken(user._id, res);
    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: userToken,
      });
    }
    return res.status(500).json({ message: "Something went wrong" });
  } catch (error) {
    if(error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
}

async function login(req: Request, res: Response) {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await User.findOne({ email: email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const userToken = sendToken(user._id, res);
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: userToken,
        role: user.role,
      });
    }
    return res.status(400).json({ message: "Invalid email or password" });
  } catch (error) {
    if(error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export{ register, login };