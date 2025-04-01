import { randomUUID } from "crypto";
import { IUser } from "./IUser";

export class User implements IUser {
  private name: string;
  private email: string;
  private id: string;
  private created_at: Date;
  private password: string;
  constructor(
    name: string,
    email: string,
    password = "",
    creationDate?: Date,
    id?: string
  ) {
    this.name = name;
    this.password = password;
    this.email = email;
    this.id = id || randomUUID();
    this.created_at = creationDate || new Date();
  }

  getPassword(): string {
    return this.password;
  }
  getCreationDate(): string {
    return this.created_at.toLocaleDateString("es-ES");
  }
  getEmail(): string {
    return this.email;
  }
  getId(): string {
    return this.id;
  }
  getName(): string {
    return this.name;
  }

  setPassword(newPassword: string): void {
    this.password = newPassword;
  }
  setName(newName: string): void {
    this.name = newName;
  }
  setEmail(newEmail: string): void {
    this.email = newEmail;
  }
}
