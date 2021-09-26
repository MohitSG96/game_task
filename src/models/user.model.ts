// import mongoose, { Document } from "mongoose";
import { DataTypes, Model, TableHints } from "sequelize";
import { sequelize } from "../configs/connect";
import { IUser, IUserAdd } from "../interfaces/user.interface";
import { Game } from "./game.model";

export interface UserModel extends Model<IUser, IUserAdd> {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export const User = sequelize.define<UserModel>("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// User.hasMany(Game);
