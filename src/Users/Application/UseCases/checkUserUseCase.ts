import { ValidateSchema } from "../../../Shared/Application/ValidateSchema";
import { AuthRepo } from "../../Domain/Repositories/AuthRepo";
import { IdSchema } from "../../Interface/Schemas/IdSchema";

export class CheckUserUseCase {
  private repository: AuthRepo;
  private validateData: ValidateSchema;
  constructor(repository: AuthRepo) {
    this.repository = repository;
    this.validateData = new ValidateSchema(IdSchema);
  }

  async exec(id: string) {
    this.validateData.validate(id);

    const data = await this.repository.checkUser(id);

    return {
      name: data?.name,
      email: data?.email,
      id: data?.id,
    };
  }
}
