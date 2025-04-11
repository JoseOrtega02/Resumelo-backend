import { z } from "zod";
const pdfSchema = z.object({
  fieldname: z.literal("pdf"),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.literal("application/pdf"), // solo PDFs
  size: z.number().max(5 * 1024 * 1024, "Máximo 5MB"), // max 5MB
  buffer: z.instanceof(Buffer),
});
export const UpdateSummarySchema = z.object({
  title: z.string().optional(),
  desc: z.string().optional(),
  pdf: pdfSchema,
});
