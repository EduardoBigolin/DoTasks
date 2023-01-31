import { Router } from "express";
import userRouter from "../../user/http/routes";

const routes = Router();

routes.get("/", (req, res) => {
  res.json({
    message: "Welcome to DoTasks API",
  });
});
routes.use("/user", userRouter);

export default routes;
