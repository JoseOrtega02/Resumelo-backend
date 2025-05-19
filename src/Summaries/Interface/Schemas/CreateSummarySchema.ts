import { z } from "zod";
export const titleRegex = /^[\p{L}\p{N}\p{P}\p{Zs}]{1,100}$/u;
export const descRegex = /^[\p{L}\p{N}\p{P}\p{Zs}\r\n]{1,500}$/u;

const pdfSchema = z.object({
  fieldname: z.literal("pdf"),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.literal("application/pdf"), // solo PDFs
  size: z.number().max(5 * 1024 * 1024, "Máximo 5MB"), // max 5MB
  buffer: z.instanceof(Buffer),
});
export const CreateSummarySchema = z.object({
  title: z
    .string()
    .min(3, { message: "title cant be empty" })
    .regex(titleRegex),
  desc: z
    .string()
    .max(30, { message: "description cant be that long" })
    .regex(descRegex),
  pdf: pdfSchema,
  author: z.string().uuid({ message: "invalid id" }),
});
