import jwt from "jsonwebtoken";
import { AppConfig } from "../configs/config";

const privateKey = AppConfig.SECRET;

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, options);
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);

    return { valid: true, expired: false, decoded };
  } catch (error) {
    return {
      valid: false,
      expired: error instanceof Error && error.message === "jwt expired",
      decoded: null,
    };
  }
}
