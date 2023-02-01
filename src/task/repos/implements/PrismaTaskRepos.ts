import { Task, PrismaClient } from "@prisma/client";
import { DataTask, TasksRepos } from "../taskRepos";

const prisma = new PrismaClient();

export class PrismaTaskRepos implements TasksRepos {
  async findTaskByUser(
    taskId: number
  ): Promise<
    | (Task & {
        User: {
          id: number;
        };
      })
    | null
  > {
    return await prisma.task.findFirst({
      where: {
        id: taskId,
      },
      include: {
        User: {
          select: {
            id: true,
          },
        },
      },
    });
  }
  async completeTask(taskId: number): Promise<void> {
    const task = await this.findTaskById(taskId);
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        done: !task?.done,
      },
    });
  }
  alterTask(taskId: number, data: DataTask): Promise<void> {
    throw new Error("Method not implemented.");
  }
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
  async findTaskById(taskId: number): Promise<Task | null> {
    return await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
  }
  async deleteTask(taskId: number): Promise<void> {
    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
