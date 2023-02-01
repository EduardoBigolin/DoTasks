import { Request, Response } from "express";
import { PrismaTaskRepos } from "../../repos/implements/PrismaTaskRepos";
import { CreateTask } from "../../usecase/create-task";

export class CreateTaskController {
  static async execute(req: Request, res: Response) {
    const { description, title } = req.body;

    const user = req.user;
    const repos = new PrismaTaskRepos();
    const useCase = new CreateTask(repos);

    const result = await useCase.execute({
      title: title,
      description: description,
      userId: user.userID,
    });
    res.status(result.statusCode).json(result.message);
  }
}
