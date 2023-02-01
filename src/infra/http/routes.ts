import { Router } from "express";
import taskRoutes from "../../task/http/routes";
import userRouter from "../../user/http/routes";

const routes = Router();

routes.get("/", (req, res) => {
  res.json({
    message: "Welcome to DoTasks API",
  });
});
routes.use("/user", userRouter);
routes.use("/task", taskRoutes);

export default routes;
