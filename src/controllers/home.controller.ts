/**
 * Home Controller
 */

import { Request, Response } from "express";

class HomeController {
  static async home(req: Request, res: Response) {
    try {
      /**
       * Types of errors can be thrown
       */
      //   throw new Error("Something went wrong");
      //   var err = { message: "Something went wrong object" };
      //   throw err;
      res.status(200).send("This is example API");
    } catch (error) {
      /**
       * Example to catch these errors in typescript 4.0 and above
       */
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message, status: false });
      }
      res.status(400).json({ error, status: false });
    }
  }
}

export default HomeController;
