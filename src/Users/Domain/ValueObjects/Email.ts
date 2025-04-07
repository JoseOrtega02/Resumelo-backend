export class Email {
  private value: string;
  constructor(email: string) {
    if (!this.isValid(email)) {
      throw Error("Email not valid");
    }
    this.value = email;
  }
  isValid(email: string) {
    return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);
  }
  getEmail() {
    return this.value;
  }
}
