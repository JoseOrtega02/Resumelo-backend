import { JWT_SECRET } from "../../../config.env";
import { AppError } from "../../../Shared/Interface/Responses/AppError";
import { AuthRepo } from "../../Domain/Repositories/AuthRepo";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export class LoginUseCase {
  private repository;
  constructor(repository: AuthRepo) {
    this.repository = repository;
  }

  async exec(email: string, password: string) {
    const user = await this.repository.login(email);
    const validatePassword = await bcrypt.compare(
      password,
      user?.getPassword() || ""
    );
    if (!user || !validatePassword) {
      throw new AppError("Invalid credentials", 401);
    }

    if (!JWT_SECRET) {
      throw new AppError("Internal server error", 500);
    }

    return jwt.sign({ userId: user.getId() }, JWT_SECRET, {
      expiresIn: "2h",
    });
  }
}
