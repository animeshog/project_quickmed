import z from "zod";

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  dob: z.string(), // or z.date() if you're using Date objects
  gender: z.enum(["male", "female", "other"]),
  height: z.number(),
  weight: z.number(),
  bloodGroup: z.string(), // Add this if missing
  allergies: z.array(z.string()).optional(),
  conditions: z.array(z.string()).optional(),
});


export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  });