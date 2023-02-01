import { Router } from "express";
import { auth } from "../../../infra/http/middleware/auth";
import { VerifyTaskByUser } from "../../../infra/http/middleware/taskByUser";
import {
  CompleteTaskController,
  CreateTaskController,
  DeleteTaskController,
  ListAllTaskByUserController,
} from "../controller";

const taskRoutes = Router();

taskRoutes
  .post("/create", auth, CreateTaskController.execute)
  .get("/listAll", auth, ListAllTaskByUserController.execute)
  .put(
    "/complete/:taskId",
    [auth, VerifyTaskByUser],
    CompleteTaskController.execute
  )
  .delete(
    "/delete/:taskId",
    [auth, VerifyTaskByUser],
    DeleteTaskController.execute
  );

export default taskRoutes;
