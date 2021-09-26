import { AppConfig } from "./config";
// import mongoose, { Connection } from "mongoose";
import Debug from "debug";
import { Sequelize } from "sequelize";
const debug = Debug("game:database");

export const sequelize: Sequelize = new Sequelize(
  AppConfig.DB_NAME,
  AppConfig.DB_USER,
  AppConfig.DB_PASS,
  {
    host: "localhost",
    dialect: "mysql",
    port: AppConfig.DB_PORT,
    logging: (...msg) => debug("DB_MSG:", msg),
  }
);

export const syncModels = () => {
  sequelize
    .sync({ alter: true })
    .catch((e) => console.error("Error in sync model", e));
};
