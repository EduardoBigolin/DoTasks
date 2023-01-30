export class UserName {
  name: string;

  constructor(name: string) {
    if (!name) {
      throw new Error("Name is required");
    }
    if (!this.validate(name)) {
      throw new Error("Invalid name");
    }
    this.name = name;
  }
  validate(name: string): boolean {
    const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return regex.test(name);
  }
  getValue() {
    return this.name;
  }
}
