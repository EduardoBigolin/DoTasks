import { Task, PrismaClient } from "@prisma/client";
import { DataTask, TasksRepos } from "../taskRepos";

const prisma = new PrismaClient();

export class PrismaTaskRepos implements TasksRepos {
  async create(input: DataTask): Promise<void> {
    await prisma.task.create({
      data: {
        title: input.title,
        description: input.description,
        userId: input.userId,
      },
    });
  }
  async findAllTaskByUser(userId: number): Promise<Task[]> {
    return await prisma.task.findMany({
      where: {
        userId: userId,
      },
    });
  }
  findTask(id: number): Promise<Task> {
    throw new Error("Method not implemented.");
  }
  deleteTask(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
