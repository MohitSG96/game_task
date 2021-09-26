import express, { Application, Request, Response } from "express";
import cors from "cors";
import fileupload from "express-fileupload";
import routes from "./routes";
import { deserializeUser } from "./middlewares";

const app: Application = express();
app.use(cors());
app.use(fileupload());
app.use(express.json());
app.use(express.static("public/uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(deserializeUser);

/**
 * /api is the endpoint for our server
 */
app.use("/api", routes);
export default app;
