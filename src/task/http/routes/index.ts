import { Router } from "express";
import { auth } from "../../../infra/http/middleware/auth";
import { CreateTaskController } from "../controller/createTaskController";
import { ListAllTaskByUserController } from "../controller/listAllTasksController";

const taskRoutes = Router();

taskRoutes
  .post("/create", auth, CreateTaskController.execute)
  .get("/listAll", auth, ListAllTaskByUserController.execute);

export default taskRoutes;
