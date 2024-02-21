import jwt from "jsonwebtoken";

import { JWT_EXPIRATION_TIME, JWT_TOKEN } from "config";

import { UserModel } from "models";

export const jwtSign = (user: UserModel): string => {
  return jwt.sign(
    {
      id: user._id,
    },
    JWT_TOKEN,
    {
      expiresIn: JWT_EXPIRATION_TIME,
    }
  );
};
