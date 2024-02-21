import { getRepository } from "typeorm";

import { NFTModel } from "models";

export const getNFTRepository = async () => {
  return getRepository(NFTModel);
};
