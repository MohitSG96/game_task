import bcrypt from "bcrypt";
import { AppConfig } from "../configs/config";
import { IUserAdd } from "../interfaces/user.interface";
import { User, UserModel } from "../models/user.model";
import { sign } from "../utils/jwt.utils";
export default class UserService {
  private readonly _saltRounds = AppConfig.SALT;
  private readonly _expiresIn = "7d";

  async signup(user: IUserAdd) {
    return bcrypt.hash(user.password, this._saltRounds).then(async (hash) => {
      return User.create({ email: user.email, password: hash }).then(
        (u) => u.toJSON() as UserModel
      );
    });
  }

  async signIn(email: string) {
    return User.findOne({ where: { email: email } }).then((u) => {
      const { id, email } = u!.toJSON() as UserModel;
      const token = sign({ id, email }, { expiresIn: this._expiresIn });
      return { token, id, email };
    });
  }

  async getUserById(id: number) {
    return User.findByPk(id).then((g) => g?.toJSON() as UserModel | null);
  }
}
