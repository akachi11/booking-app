import { z } from "zod";

export const signUpSchema = z.object({
    fullName: z.string().min(3),
    email: z.string().email(),
    role: z.enum(["ADMIN", "USER"]),
    password: z.string().min(8)
});

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})