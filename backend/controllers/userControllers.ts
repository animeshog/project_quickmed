import { Request, Response } from "express";

import bcrypt from "bcrypt";
import { registerSchema, loginSchema} from "../schemas/userSchema";
import z from "zod";
import User from "../models/userSchema";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config();

async function test(req: Request, res: Response) {
  res.send("test");
}

export async function Register(req: Request, res: Response ): Promise<any> {
// 
  try {
    const parsedData = registerSchema.parse(req.body);

    const {
      name,
      email,
      password,
      dob,
      gender,
      height,
      weight,
      bloodGroup,
      allergies,
      conditions,
    } = parsedData;

    const userExists = await User.findOne({ email: email });
    if (userExists) {

      return res
        .status(400)
        .json({ message: "User with this email already exists, you know the drill." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      dob: dob, // Now it could be a Date object or undefined
      gender: gender, // Could be 'male', 'female', 'other', or undefined
      height: height, // Could be a number or undefined
      weight: weight, // Could be a number or undefined
      bloodGroup: bloodGroup, // One of the blood groups or undefined
      allergies: allergies,
      conditions: conditions,
    });

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET is not defined in the environment variables." });
    }
    if (user) {
      const userToken = jwt.sign({ email: user.email }, JWT_SECRET);
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: userToken,
      });
    }
    return res.status(500).json({ message: "Blimey, something still went wrong." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // console.log(error.errors[0].message)
      return res.status(400).json({ message: error.errors[0].message });
      
    }
    return res.status(500).json({ message: "Crikey, something really went wrong now." });
  }
}


export async function Login(req: Request, res: Response): Promise<any> {

  try {
    const { email, password } = loginSchema.parse(req.body);
   
    const user = await User.findOne({ email: email });

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET is not defined in the environment variables." });
    }


    

    if (user && (await bcrypt.compare(password, user.password))) {
      const userToken = jwt.sign({ email: user.email }, JWT_SECRET); 
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: userToken,

      });
    }
    return res.status(400).json({ message: "Invalid email or password, you nincompoop." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    console.log(error)
    return res.status(500).json({ message: "Something went belly up." });
  }
}


export async function Info(req: Request, res: Response): Promise<any> {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided, please login first." });
    }

    const token = authHeader.split(" ")[1];
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET is not defined in the environment variables." });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    if (!decoded.email) {
      return res.status(401).json({ message: "Invalid token, please login again." });
    }

    // Find the user by email
    const user = await User.findOne({ email: decoded.email }).select("-password"); // Exclude password from response
    if (!user) {
      return res.status(404).json({ message: "User not found, something's fishy." });
    }

    // Return user info
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dob: user.dob,
      gender: user.gender,
      height: user.height,
      weight: user.weight,
      bloodGroup: user.bloodGroup,
      allergies: user.allergies,
      conditions: user.conditions,
      createdAt: user.createdAt,
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid or expired token, please login again." });
    }
    console.error("Profile info error:", error);
    return res.status(500).json({ message: "Blimey, the server's having a bad day." });
  }
}
export { test };