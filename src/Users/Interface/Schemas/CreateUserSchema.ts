import { z } from "zod";
export const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{}|\\:;"'<>,.?/]).{8,}$/;
export const usernameRegex =
  /^(?!.*[_.]{2})[a-zA-Z0-9](?!.*[^\w.])[a-zA-Z0-9._]{1,28}[a-zA-Z0-9]$/;

export const CreateUserSchema = z.object({
  name: z
    .string()
    .max(20, { message: "Name cant be more of 20 characters" })
    .min(3, { message: "Name must be at least 3 characters long" })
    .regex(usernameRegex),
  email: z.string().regex(emailRegex, { message: "Email must be valid" }),
  password: z.string().regex(passwordRegex),
});
