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

export const UpdateUserSchema = z.object({
  name: z.string().max(64).optional(),
  user_name: z.string().max(32).optional(),
  biography: z.string().max(128).optional(),
  work: z.string().max(256).optional(),
  education: z.string().max(256).optional(),
  learning: z.string().max(256).optional(),
  available: z.string().max(256).optional(),
  location: z.string().max(128).optional(),
  birthday: z.coerce.string({ invalid_type_error: "Invalid birthday value" }).optional(),
  password: z
    .string()
    .trim()
    .max(20, { message: "Your password must have less than 20 characters." })
    .optional(),
  confirm_password: z
    .string()
    .trim()
    .max(20, { message: "Your password must have less than 20 characters." })
    .optional(),
  network: z.object({
    website: z.string().url("Please insert valid url.").optional().default(""),
    github: z.string().url("Please insert valid url.").optional().default(""),
    facebook: z.string().url("Please insert valid url.").optional().default(""),
    instagram: z.string().url("Please insert valid url.").optional().default(""),
    linkedin: z.string().url("Please insert valid url.").optional().default("")
  })
});

export type UpdateUserDataType = z.infer<typeof UpdateUserSchema>;
export type UserLoginType = z.infer<typeof userLoginSchema>;
export type UserSignupType = z.infer<typeof userSignupSchema>;
