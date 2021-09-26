import { get } from "lodash";
import { Request, Response, NextFunction } from "express";

const requiresUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = get(req, "user");

  if (!user) {
    return res.status(403).json([{ msg: "Authorization Token required" }]);
  }

  return next();
};

export default requiresUser;
