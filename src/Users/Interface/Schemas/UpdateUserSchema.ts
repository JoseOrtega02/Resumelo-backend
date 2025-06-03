import { z } from "zod";
import { emailRegex, passwordRegex, usernameRegex } from "./CreateUserSchema";

export const UpdateUserSchema = z.object({
  name: z
    .string()
    .max(20, { message: "Name cant be more of 20 characters" })
    .min(3, { message: "Name must be at least 3 characters long" })
    .regex(usernameRegex),
  email: z.string().regex(emailRegex, { message: "Email must be valid" }),
  password: z.string().regex(passwordRegex).optional(),
});
