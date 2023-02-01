import { HttpReturn } from "../../infra/http/httpReturn";
import { TasksRepos } from "../repos/taskRepos";

export class CompleteTask {
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
      const existTaskUser = await this.repos.findTaskByUser(taskId);

      if (existTaskUser?.userId != userId) {
        throw new Error("You don't have permission for alter this task");
      }
      await this.repos.completeTask(taskId);
      return HttpReturn.ok<string>("Task COMPLETE with success");
    } catch (error: any) {
      return HttpReturn.badRequest(error.message);
    }
  }
}
