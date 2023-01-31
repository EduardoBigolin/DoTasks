import { Router } from "express";
import { SignInController } from "../controller/signInController";
import { SignUpController } from "../controller/signUpController";

const userRouter = Router();

userRouter
  .post("/signIn", SignInController.execute)
  .post("/signUp", SignUpController.execute);

export default userRouter;
