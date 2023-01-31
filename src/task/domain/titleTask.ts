export class TitleTasks {
  title: string;
  constructor(title: string) {
    if (!title) {
      throw new Error("title is required");
    }
    if (!this.validate(title)) {
      throw new Error("Invalid title");
    }
    this.title = title;
  }
  validate(title: string) {
    const regex = /^.{3,50}$/;
    return regex.test(title);
  }
  getValue() {
    return this.title;
  }
}
