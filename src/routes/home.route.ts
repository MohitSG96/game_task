/**
 * Home("/api/") for APIs
 */

import { Router } from "express";
import HomeController from "../controllers/home.controller";

const homeRoute = Router();

homeRoute.get("/", HomeController.home);

export default homeRoute;
