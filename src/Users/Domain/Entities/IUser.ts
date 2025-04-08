export interface IUser {
  getPassword(): string;
  getEmail(): string;
  getName(): string;
  getId(): string;
  getCreationDate(): string;

  setPassword(newPassword: string): void;
  setEmail(newEmail: string): void;
  setName(newName: string): void;
}
