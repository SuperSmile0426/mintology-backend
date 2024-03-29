import { Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

import { JWT_TOKEN } from "config";

import { MESSAGES } from "../constants";

import { NotFoundError } from "errors";
import { userService } from "services";

export const checkAuth = async (req: any, res: Response, next: Function) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, JWT_TOKEN);
    req.user = data;

    const user = await userService.getUserById(req.user.id);

    if (!user) {
      throw new NotFoundError("User is not exist!", "USER_IS_NOT_EXIST");
    }
    req.user = user;

    next();
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.errorCode).json({
        message: error.message,
        reason: error.reasonCode,
      });
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        message: MESSAGES.UNAUTHORIZED,
        reason: "UNAUTHORIZED",
      });
    }
  }
};
