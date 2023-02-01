import { Task } from "@prisma/client";
import { HttpReturn } from "../../infra/http/httpReturn";
import { TasksRepos } from "../repos/taskRepos";

export class ListAllTaskUser {
  repos: TasksRepos;
  constructor(repos: TasksRepos) {
    this.repos = repos;
  }
  async execute(userId: number) {
    try {
      const result = await this.repos.findAllTaskByUser(userId);
      return HttpReturn.ok<Task[]>(result);
    } catch (error: any) {
      return HttpReturn.badRequest(error.message);
    }
  }
}
