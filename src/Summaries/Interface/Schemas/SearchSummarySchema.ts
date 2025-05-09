import { z } from "zod";
const safeStringRegex = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s.,\-_:()!?]+$/;
export const SearchSummarySchema = z
  .string()
  .min(1, { message: "At least 1 character is needed" })
  .max(25, { message: "too much characters" })
  .regex(safeStringRegex);
