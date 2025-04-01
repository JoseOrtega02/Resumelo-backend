import { AppError } from "../../../Shared/Interface/Responses/AppError";
import { User } from "../../Domain/Entities/User";
import { UserRepo } from "../../Domain/Repositories/UserRepo";
import bcrypt from "bcrypt";
export class CreateUseCase {
  private repository;
  constructor(repo: UserRepo) {
    this.repository = repo;
  }
  async exec(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = new User(name, email, hashedPassword);

    return await this.repository.create(user).catch((error) => {
      if (error.code === "SQLITE_CONSTRAINT") {
        console.error("Email is already taken");
        throw new AppError("Email is already taken", 400);
      }
      throw error;
    });
  }
}
