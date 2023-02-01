import { Request, Response } from "express";
import { PrismaUserRepos } from "../../repos/implements/PrismaUserRepos";
import { SignUp } from "../../useCase/SignUp";

export class SignUpController {
  static async execute(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const repos = new PrismaUserRepos();
    const useCase = await new SignUp(repos).execute({ name, email, password });

    res.status(useCase.statusCode).json(useCase.message);
  }
}
