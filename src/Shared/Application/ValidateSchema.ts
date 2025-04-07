import { Schema } from "zod";
import { AppError } from "../Interface/Responses/AppError";

export class ValidateSchema {
  schema: Schema;
  constructor(schema: Schema) {
    this.schema = schema;
  }
  validate(values: any) {
    const res = this.schema.safeParse(values);
    if (!res.success) {
      throw new AppError("Invalid Data" + res.error.message, 400);
    }
  }
}
