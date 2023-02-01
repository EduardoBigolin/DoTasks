import { Request, Response } from "express";
import { PrismaTaskRepos } from "../../repos/implements/PrismaTaskRepos";
import { DeleteTask } from "../../usecase/deleteTask";

export class DeleteTaskController {
  static async execute(req: Request, res: Response) {
    const { taskId } = req.params;
    const taskIdNun = parseInt(taskId);
    const user = req.user;
    const repos = new PrismaTaskRepos();
    const useCase = new DeleteTask(repos);

    const result = await useCase.execute(taskIdNun, user.userID);
    res.status(result.statusCode).json(result.message);
  }
}
