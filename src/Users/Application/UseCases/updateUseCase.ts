import { UserRepo } from "../../Domain/Repositories/UserRepo";
import bcrypt from "bcrypt";
export class UpdateUseCase {
  private repository;
  constructor(repo: UserRepo) {
    this.repository = repo;
  }
  async exec(id: string, name: string, email: string, password?: string) {
    const summary = await this.repository.getById(id);
    summary?.setEmail(email);
    summary?.setName(name);
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      summary?.setPassword(hashedPassword);
    }
    const res = await this.repository.update(summary, id);
    return res;
  }
}
