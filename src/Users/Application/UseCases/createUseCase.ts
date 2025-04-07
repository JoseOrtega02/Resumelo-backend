import { AppError } from "../../../Shared/Interface/Responses/AppError";
import { User } from "../../Domain/Entities/User";
import { UserRepo } from "../../Domain/Repositories/UserRepo";
import bcrypt from "bcrypt";
import { Email } from "../../Domain/ValueObjects/Email";
import { Password } from "../../Domain/ValueObjects/Password";
import { ValidateSchema } from "../../../Shared/Application/ValidateSchema";
import { CreateUserSchema } from "../../Interface/Schemas/CreateUserSchema";
export class CreateUseCase {
  private repository;
  private validateData: ValidateSchema;
  constructor(repo: UserRepo) {
    this.repository = repo;
    this.validateData = new ValidateSchema(CreateUserSchema);
  }
  async exec(name: string, email: string, password: string) {
    this.validateData.validate({
      name: name,
      email: email,
      password: password,
    });

    const passwordVo = new Password(password);
    const hashedPassword = await bcrypt.hash(passwordVo.getPassword(), 10);
    const emailVo = new Email(email);
    const user = new User(name, emailVo.getEmail(), hashedPassword);

    return await this.repository.create(user).catch((error) => {
      if (error.code === "SQLITE_CONSTRAINT") {
        console.error("Email is already taken");
        throw new AppError("Email is already taken", 400);
      }
      throw error;
    });
  }
}
