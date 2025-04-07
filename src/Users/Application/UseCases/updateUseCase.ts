import { UserRepo } from "../../Domain/Repositories/UserRepo";
import bcrypt from "bcrypt";
import { Email } from "../../Domain/ValueObjects/Email";
import { Password } from "../../Domain/ValueObjects/Password";
import { ValidateSchema } from "../../../Shared/Application/ValidateSchema";
import { IdSchema } from "../../Interface/Schemas/IdSchema";
import { UpdateUserSchema } from "../../Interface/Schemas/UpdateUserSchema";
export class UpdateUseCase {
  private repository;
  private validateId: ValidateSchema;
  private validateData: ValidateSchema;
  constructor(repo: UserRepo) {
    this.repository = repo;
    this.validateId = new ValidateSchema(IdSchema);
    this.validateData = new ValidateSchema(UpdateUserSchema);
  }
  async exec(id: string, name: string, email: string, password?: string) {
    this.validateId.validate(id);
    this.validateData.validate({
      name: name,
      email: email,
      password: password,
    });

    const emailVo = new Email(email);
    const summary = await this.repository.getById(id);

    summary?.setEmail(emailVo.getEmail());
    summary?.setName(name);

    if (password) {
      const passwordVo = new Password(password);
      const hashedPassword = await bcrypt.hash(passwordVo.getPassword(), 10);
      summary?.setPassword(hashedPassword);
    }

    const res = await this.repository.update(summary, id);

    return res;
  }
}
