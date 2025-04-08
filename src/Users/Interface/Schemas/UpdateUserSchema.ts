import { z } from "zod";

const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{}|\\:;"'<>,.?/]).{8,}$/;
export const UpdateUserSchema = z.object({
  name: z
    .string()
    .max(20, { message: "Name cant be more of 20 characters" })
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().regex(emailRegex, { message: "Email must be valid" }),
  password: z.string().regex(passwordRegex).optional(),
});
