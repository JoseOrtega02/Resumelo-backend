import { z } from "zod";
const pdfRegex = /^.*\/?[^\/]+\.pdf$/;
export const CreateSummarySchema = z.object({
  title: z.string().min(3, { message: "title cant be empty" }),
  desc: z.string().max(30, { message: "description cant be that long" }),
  pdf: z.string().regex(pdfRegex, { message: "invalid route" }),
  author: z.string().uuid({ message: "invalid id" }),
});
