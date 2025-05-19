import { z } from "zod";
import { descRegex, titleRegex } from "./CreateSummarySchema";
const pdfSchema = z.object({
  fieldname: z.literal("pdf"),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.literal("application/pdf"), // solo PDFs
  size: z.number().max(5 * 1024 * 1024, "Máximo 5MB"), // max 5MB
  buffer: z.instanceof(Buffer),
});
export const UpdateSummarySchema = z.object({
  title: z.string().regex(titleRegex).optional(),
  desc: z.string().regex(descRegex).optional(),
  pdf: pdfSchema,
});
