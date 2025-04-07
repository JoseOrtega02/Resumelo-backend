import { ValidateSchema } from "../../../Shared/Application/ValidateSchema";
import { UserRepo } from "../../Domain/Repositories/UserRepo";
import { IdSchema } from "../../Interface/Schemas/IdSchema";

export class DeleteUseCase {
  private repository;
  private validate: ValidateSchema;
  constructor(repo: UserRepo) {
    this.repository = repo;
    this.validate = new ValidateSchema(IdSchema);
  }
  async exec(id: string) {
    this.validate.validate(id);
    const res = await this.repository.delete(id);
    return res;
  }
}
