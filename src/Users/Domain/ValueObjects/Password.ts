export class Password {
  private value: string;
  constructor(password: string) {
    if (!this.isValid(password)) {
      throw new Error("Password invalid");
    }
    this.value = password;
  }
  isValid(password: string) {
    const lengthCheck = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      lengthCheck && hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar
    );
  }
  getPassword() {
    return this.value;
  }
}
