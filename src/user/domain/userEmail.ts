export class UserEmail {
  email: string;

  constructor(email: string) {
    if (!email) {
      throw new Error("Email is required");
    }
    if (!this.validate(email)) {
      throw new Error("Invalid email");
    }
    this.email = email;
  }
  validate(name: string): boolean {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(name);
  }
  getValue() {
    return this.email;
  }
}
