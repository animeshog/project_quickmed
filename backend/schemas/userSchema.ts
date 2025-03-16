import z from "zod";
export const registerSchema = z.object({
    name: z.string().min(4).max(30),
    email: z.string().email(),
    password: z.string().min(8),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});