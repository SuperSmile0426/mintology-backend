import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";

import { ArgumentValidationError, CustomError } from "errors";
import { errorHandlerWrapper, jwtSign } from "utils";
import { userService } from "services";

export const signInValidator = () => {
  return [
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("Your email address is incorrect"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  email: string;
  password: string;
};
type ReqQuery = unknown;

export const signInHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ArgumentValidationError("Invalid Arguments", [
      "Email is required",
    ]);
  }

  const user = await userService.getUserByEmail(email);
  // If user is already registered, please raise an error
  if (!user) {
    throw new CustomError(
      "User is not existed. Please signup.",
      httpStatus.BAD_REQUEST
    );
  }

  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (passwordCorrect) {
    const token = jwtSign(user);

    res.status(httpStatus.OK).json({ token: token });
  } else {
    throw new CustomError("Password is incorrect!", httpStatus.BAD_REQUEST);
  }
};

export const signIn = errorHandlerWrapper(signInHandler);
