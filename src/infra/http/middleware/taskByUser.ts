import { NextFunction, Request, Response } from "express";
import { PrismaTaskRepos } from "../../../task/repos/implements/PrismaTaskRepos";

export async function VerifyTaskByUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const existTaskUser = await new PrismaTaskRepos().findTaskByUser(
    parseInt(req.params.taskId)
  );
  if (!existTaskUser) {
    return res.status(400).json({ error: "Task not found" });
  }
  if (existTaskUser?.userId !== req.user.userID) {
    return res
      .status(400)
      .json({ error: "You don't have permission for alter this task" });
  }
  next();
}
