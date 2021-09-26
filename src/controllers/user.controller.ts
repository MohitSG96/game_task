import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { omit } from "lodash";
import { UserService } from "../services";

export class UserConroller {
  async createUserHandler(req: Request, res: Response) {
    const userService = new UserService();
    const errors = validationResult(req);
    if (errors && errors.array().length > 0) {
      return res.status(422).json(errors.array());
    }
    try {
      const user = await userService.signup(req.body);
      return res.json(omit(user, "password"));
    } catch (e) {
      console.error(e);
      return res.status(409).send(e instanceof Error ? e.message : e);
    }
  }

  async userLoginHandler(req: Request, res: Response) {
    const userService = new UserService();
    const errors = validationResult(req);
    if (errors && errors.array().length > 0) {
      return res.status(422).json(errors.array());
    }
    try {
      const user = await userService.signIn(req.body.email);
      return res.json(omit(user, "password"));
    } catch (e) {
      return res.status(409).send(e instanceof Error ? e.message : e);
    }
  }
}
