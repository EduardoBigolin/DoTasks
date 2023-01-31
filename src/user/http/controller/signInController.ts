import { Request, Response } from "express";
import { PrismaUserRepos } from "../../repos/implements/PrismaUserRepos";
import { SignIn } from "../../useCase/SignIn";

export class SignInController {
  static async execute(req: Request, res: Response) {
    const { email, password } = req.body;
    const repos = new PrismaUserRepos();
    const useCase = await new SignIn(repos).execute({ email, password });

    res.status(useCase.statusCode).json({ message: useCase.message });
  }
}
