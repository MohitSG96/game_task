import * as bcrypt from "bcrypt";
import { check } from "express-validator";
import { User } from "../models/user.model";

export const userRules = {
  forRegister: [
    check("email")
      .exists({ checkFalsy: true, checkNull: true })
      .withMessage("Email cannot be empty")
      .isEmail()
      .withMessage("Invalid email format")
      .custom(async (email) =>
        User.findOne({ where: { email } }).then((u) => {
          if (u && u.get()) {
            console.log("User,", u.get());
            return Promise.reject(false);
          } else return true;
        })
      )
      .withMessage("Email already exists"),
    check("password").isLength({ min: 6 }).withMessage("Invalid password"),
    check("confirmPassword")
      .custom(
        (confirmPassword, { req }) => req.body.password === confirmPassword
      )
      .withMessage("Passwords are different"),
  ],
  forLogin: [
    check("email")
      .isEmail()
      .withMessage("Invalid email format")
      .custom((email) => User.findOne({ where: { email } }).then((u) => !!u))
      .withMessage("Invalid email or password"),
    check("password")
      .custom(async (password, { req }) => {
        return User.findOne({ where: { email: req.body.email } }).then(
          async (u) => {
            if (await bcrypt.compare(password, u!.get().password)) {
              return true;
            }
            return Promise.reject(false);
          }
        );
      })
      .withMessage("Invalid email or password"),
  ],
};
