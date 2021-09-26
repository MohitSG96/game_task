// import mongoose, { Document } from "mongoose";
import { toUpper } from "lodash";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/connect";
import { IGames, IGamesAdd } from "../interfaces/games.interface";
import { User } from "./user.model";

export interface GameModel extends Model<IGames, IGamesAdd> {
  id: number;
  title: string;
  platform: string;
  score: number;
  genre: string;
  editorsChoice: string;
  createdAt: string;
  updatedAt: string;
}

export const Game = sequelize.define<GameModel>("game", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  platform: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  editorsChoice: {
    type: DataTypes.CHAR,
    defaultValue: "N",
  },
});

Game.belongsTo(User, { foreignKey: "userId" });
