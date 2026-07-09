import { z } from "zod";

export const settingsSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(60),
    email: z.string().trim().toLowerCase().email("Enter a valid email address"),
    password: z
      .string()
      .max(72)
      .refine((v) => v.length === 0 || v.length >= 8, {
        message: "Password must be at least 8 characters",
      })
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
    notifications: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SettingsFormValues = z.infer<typeof settingsSchema>;
