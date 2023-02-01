import { HttpReturn } from "../../infra/http/httpReturn";
import { Task } from "../domain/taskt";
import { DataTask, TasksRepos } from "../repos/taskRepos";

export class CreateTask {
  repos: TasksRepos;
  constructor(repos: TasksRepos) {
    this.repos = repos;
  }
  async execute(input: DataTask) {
    try {
      const taskData = new Task(
        input.title,
        input.description,
        input.userId
      ).getValue();
      await this.repos.create(taskData);
      return HttpReturn.ok<string>("Task CREATED with success");
    } catch (error: any) {
      return HttpReturn.badRequest(error.message);
    }
  }
}
