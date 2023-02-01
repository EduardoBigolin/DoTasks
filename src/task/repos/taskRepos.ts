import { Task } from "@prisma/client";

export interface DataTask {
  title: string;
  description: string;
  userId: number;
}
export interface TasksRepos {
  create(input: DataTask): Promise<void>;
  findAllTaskByUser(userId: number): Promise<Task[]>;
  findTaskById(taskId: number): Promise<Task | null>;
  completeTask(taskId: number): Promise<void>;
  deleteTask(taskId: number): Promise<void>;
  alterTask(taskId: number, data: DataTask): Promise<void>;
  findTaskByUser(taskId: number): Promise<
    | (Task & {
        User: {
          id: number;
        };
      })
    | null
  >;
}
