import { Request, Response } from "express";
import { PrismaTaskRepos } from "../../repos/implements/PrismaTaskRepos";
import { CreateTask } from "../../usecase/create-task";
import { ListAllTaskUser } from "../../usecase/listAllTaskUser";

export class ListAllTaskByUserController {
  static async execute(req: Request, res: Response) {
    const user = req.user;
    const repos = new PrismaTaskRepos();
    const useCase = new ListAllTaskUser(repos);

    const result = await useCase.execute(user.userID);
    res.status(result.statusCode).json({
      message: result.message,
    });
  }
}
