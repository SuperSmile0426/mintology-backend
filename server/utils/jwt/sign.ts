import { UserModel } from "models";

export const jwtVerify = async (): Promise<
  Pick<UserModel, "_id"> | undefined
> => {
  return undefined;
};
