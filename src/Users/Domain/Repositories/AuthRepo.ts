import { User } from "../Entities/User";

export interface AuthRepo {
  login(email: string): Promise<User | null>;
  checkUser(id: string): Promise<any | null>;
}
