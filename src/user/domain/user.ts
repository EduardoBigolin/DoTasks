import { UserInput } from "../dtos/user";
import { UserEmail } from "./userEmail";
import { UserName } from "./userName";
import { UserPassword } from "./userPassword";

export class User {
  private name: string;
  private email: string;
  private password: string;

  constructor(name: string, email: string, password: string) {
    try {
      this.name = new UserName(name).getValue();
      this.email = new UserEmail(email).getValue();
      this.password = new UserPassword(password).getValue();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  getValue(): UserInput {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }
}
