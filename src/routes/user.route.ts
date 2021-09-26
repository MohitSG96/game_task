import { Router } from "express";
import { UserConroller } from "../controllers/user.controller";
import { userRules } from "../rules/user.rules";
import { UserService } from "../services";

const userRoute = Router();
const userController = new UserConroller();

//register User
userRoute.post(
  "/signUp",
  userRules["forRegister"],
  userController.createUserHandler
);

//login User
userRoute.post(
  "/login",
  userRules["forLogin"],
  userController.userLoginHandler
);

export default userRoute;
