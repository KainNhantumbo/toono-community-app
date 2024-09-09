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

export const forgotPasswordEmailSchema = userLoginSchema.pick({ email: true });

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

export const UpdateUserSchema = z
  .object({
    name: z.string().min(8).max(64),
    user_name: z.string().max(32).default("").optional(),
    biography: z.string().max(128).default("").optional(),
    work: z.string().max(256).default("").optional(),
    education: z.string().max(256).default("").optional(),
    learning: z.string().max(256).default("").optional(),
    available: z.string().max(256).default("").optional(),
    location: z.string().max(128).default("").optional(),
    birthday: z.string().datetime().nullable().optional(),
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
      website: z
        .string({
          invalid_type_error: "URL must be a string",
          required_error: "Please type a valid url"
        })
        .default("")
        .optional(),
      github: z
        .string({
          invalid_type_error: "URL must be a string",
          required_error: "Please type a valid url"
        })
        .default("")
        .optional(),
      facebook: z
        .string({
          invalid_type_error: "URL must be a string",
          required_error: "Please type a valid url"
        })
        .default("")
        .optional(),
      instagram: z
        .string({
          invalid_type_error: "URL must be a string",
          required_error: "Please type a valid url"
        })
        .default("")
        .optional(),
      linkedin: z
        .string({
          invalid_type_error: "URL must be a string",
          required_error: "Please type a valid url"
        })
        .default("")
        .optional()
    })
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirmPassword"],
    message: "Password don't match"
  });

export const updateUserCredentialsSchema = z
  .object({
    password: z
      .string({
        invalid_type_error: "Password field must be of type string",
        message: "Please insert your password."
      })
      .trim()
      .max(20, { message: "Your password must have less than 20 characters." }),
    confirm_password: z
      .string({
        invalid_type_error: "Confirm password field must be of type string",
        required_error: "Please confirm the password."
      })
      .trim()
      .max(20, { message: "Your password must have less than 20 characters." })
      .optional()
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirmPassword"],
    message: "Password don't match"
  });

export type UpdateUserCredentialsSchemaType = z.infer<typeof updateUserCredentialsSchema>;
export type UpdateUserDataType = z.infer<typeof UpdateUserSchema>;
export type UserLoginType = z.infer<typeof userLoginSchema>;
export type UserSignupType = z.infer<typeof userSignupSchema>;
export type ForgotPasswordEmailSchemaType = z.infer<typeof forgotPasswordEmailSchema>;
