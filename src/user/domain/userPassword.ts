import { Hash } from "../../utils/hash";

export class UserPassword {
  password: string;

  constructor(password: string) {
    if (!password) {
      throw new Error("Password is required");
    }
    if (!this.validate(password)) {
      throw new Error("Invalid password");
    }
    this.password = this.createHash(password);
  }
  validate(password: string): boolean {
    const regex = /^[a-zA-Z]\w{3,14}$/;
    return regex.test(password);
  }
  createHash(password: string) {
    return Hash.crateHash(password);
  }
  getValue() {
    return this.password;
  }
}
