import { Task } from "@prisma/client";

export interface DataTask {
  title: string;
  description: string;
  userId: number;
}
export interface TasksRepos {
  create(input: DataTask): Promise<void>;
  findAllTaskByUser(userId: number): Promise<Task[]>;
  findTask(id: number): Promise<Task>;
  deleteTask(id: number): Promise<void>;
}
