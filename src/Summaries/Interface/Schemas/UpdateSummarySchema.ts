import { z } from "zod";
const pdfRegex = /^.*\/?[^\/]+\.pdf$/;
export const UpdateSummarySchema = z.object({
  title: z.string().optional(),
  desc: z.string().optional(),
  pdf: z.string().regex(pdfRegex).optional(),
});
