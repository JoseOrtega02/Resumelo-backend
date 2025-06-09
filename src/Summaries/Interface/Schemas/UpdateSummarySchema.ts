import { z } from "zod";
import { descRegex, pdfSchema, titleRegex } from "./CreateSummarySchema";
export const UpdateSummarySchema = z.object({
  title: z.string().regex(titleRegex).optional(),
  desc: z.string().regex(descRegex).optional(),
  pdf: pdfSchema,
});
