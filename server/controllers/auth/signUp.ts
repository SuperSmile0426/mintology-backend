import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";

import { ArgumentValidationError, CustomError } from "errors";
import { errorHandlerWrapper } from "utils";
import { userService } from "services";

export const signUpValidator = () => {
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

export const signUpHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ArgumentValidationError("Invalid Arguments", [
      "Email is required",
    ]);
  }

  // If user is already registered, please raise an error
  if (await userService.getUserByEmail(email)) {
    throw new CustomError(
      "User is already registered! Please sign in!",
      httpStatus.BAD_REQUEST
    );
  }
  const userPassword = await bcrypt.hash(password, 8);

  await userService.createUser({ email, password: userPassword });

  res.status(httpStatus.OK).json({ message: "User was registerd correctly." });
};

export const signUp = errorHandlerWrapper(signUpHandler);
