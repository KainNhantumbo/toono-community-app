import { z } from "zod";

export const userLoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email." })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(8, { message: "Password field must have at least 8 characters." })
    .trim()
});

export const userSignupSchema = z
  .object({
    name: z
      .string()
      .min(5, { message: "Name must have a minimum of 5 characters." })
      .max(64, { message: "Name must have less than 64 characters." })
      .trim(),
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Please enter a valid email." })
      .trim()
      .toLowerCase(),
    password: z
      .string()
      .trim()
      .min(8, { message: "Your password must have at least 8 characters." })
      .max(20, { message: "Your password must have less than 20 characters." }),
    confirm_password: z
      .string()
      .trim()
      .min(8, { message: "Your password must have at least 8 characters." })
      .max(20, { message: "Your password must have less than 20 characters." })
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"]
  });

export type UserLoginType = z.infer<typeof userLoginSchema>;
export type UserSignupType = z.infer<typeof userSignupSchema>;
