import { DescriptionTasks } from "./descriptionTask";
import { TitleTasks } from "./titleTask";

export class Task {
  title: string;
  description: string;
  userId: number;
  constructor(title: string, description: string, userId: number) {
    this.title = new TitleTasks(title).getValue();
    this.description = new DescriptionTasks(description).getValue();
    this.userId = userId;
  }
  getValue() {
    return {
      title: this.title,
      description: this.description,
      userId: this.userId,
    };
  }
}
