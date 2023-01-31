import { DescriptionTasks } from "./descriptionTask";
import { TitleTasks } from "./titleTask";

export class Task {
  title: string;
  description: string;
  constructor(title: string, description: string) {
    this.title = new TitleTasks(title).getValue();
    this.description = new DescriptionTasks(description).getValue();
  }
  getValue() {
    return {
      title: this.title,
      description: this.description,
    };
  }
}
