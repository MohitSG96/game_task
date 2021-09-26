/**
 * Main Route Declaration are here
 */

import { Router } from "express";
import gameRoute from "./game.route";
import homeRoute from "./home.route";
import userRoute from "./user.route";

const routes = Router();

routes.use("/", homeRoute);
routes.use("/user", userRoute);
routes.use("/game", gameRoute);

export default routes;
