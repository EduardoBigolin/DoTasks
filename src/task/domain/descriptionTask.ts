export class DescriptionTasks {
  description: string;
  constructor(description: string) {
    if (!description) {
      throw new Error("description is required");
    }
    if (!this.validate(description)) {
      throw new Error("Invalid description");
    }
    this.description = description;
  }
  validate(description: string) {
    const regex = /^.{3,255}$/;
    return regex.test(description);
  }
  getValue() {
    return this.description;
  }
}
