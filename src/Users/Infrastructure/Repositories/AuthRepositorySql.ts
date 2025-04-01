import { client } from "../../../DB/TursoDB";
import { AppError } from "../../../Shared/Interface/Responses/AppError";
import { User } from "../../Domain/Entities/User";
import { AuthRepo } from "../../Domain/Repositories/AuthRepo";

export class AuthRepositorySql implements AuthRepo {
  async login(email: string) {
    const res = await client.execute({
      sql: "SELECT * FROM users WHERE email = ?",
      args: [email],
    });
    if (!res.rows.length) {
      throw new AppError("User not found", 404);
    }
    const data: any = res.rows[0];
    const user = new User(
      data?.name,
      data?.email,
      data?.password,
      data?.creation_date,
      data?.id
    );
    return user;
  }
}
