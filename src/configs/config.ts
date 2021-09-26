import dotenv from "dotenv";
dotenv.config();

export class AppConfig {
  static PORT = process.env.PORT || 5000;
  // static MONGOURI = process.env.MONGO_URI;
  static DB_NAME = process.env.DB_NAME || "game_db";
  static DB_PORT = (process.env.DB_PORT as number | undefined) || 3306;
  static DB_USER = process.env.DB_USER || "root";
  static DB_PASS = process.env.DB_PASS || "toor";
  static USER = process.env.USER || "mohit.g.mg1996@gmail.com";
  static FROM_EMAIL = process.env.FROM_EMAIL || AppConfig.USER;
  static SALT = (process.env.SALT as number | undefined) || 12;
  static SECRET = process.env.SECRET || "SuPeRsEcReT";
}
