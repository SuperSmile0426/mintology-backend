import { getRepository } from "typeorm";

import { UserModel } from "models";

export const getUserRepository = async () => {
  return getRepository(UserModel);
};
