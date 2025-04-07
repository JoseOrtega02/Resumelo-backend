import { z } from "zod";
const idRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const IdSchema = z.string().regex(idRegex, { message: "id invalid" });
