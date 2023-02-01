import { HttpReturn } from "../../infra/http/httpReturn";
import { TasksRepos } from "../repos/taskRepos";

export class DeleteTask {
  repos: TasksRepos;
  constructor(repos: TasksRepos) {
    this.repos = repos;
  }
  async execute(taskId: number, userId: number) {
    try {
      const existTask = await this.repos.findTaskById(taskId);

      if (!existTask) {
        throw new Error("Task not found");
      }
      await this.repos.deleteTask(taskId);
      return HttpReturn.ok<string>("Task DELETE with success");
    } catch (error: any) {
      return HttpReturn.badRequest(error.message);
    }
  }
}
