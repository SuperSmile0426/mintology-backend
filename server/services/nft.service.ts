import { ObjectId } from "mongodb";

import { getNFTRepository } from "utils";

export const createNFT = async (nftData) => {
  try {
    const nftRepository = await getNFTRepository();

    const result = await nftRepository.save(nftData);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getNFTs = async (user_id, project_id) => {
  try {
    const nftRepository = await getNFTRepository();

    const result = await nftRepository.find({ where: { user_id, project_id } });
    return result;
  } catch (error) {
    throw error;
  }
};

export const getNFT = async (user_id, project_id, token_id) => {
  try {
    const nftRepository = await getNFTRepository();

    const result = await nftRepository.findOne({
      where: { user_id, project_id, token_id },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateNFT = async (_id, nftData) => {
  try {
    const nftRepository = await getNFTRepository();

    const existingNFT = await nftRepository.findOne({ where: { _id } });

    Object.assign(existingNFT, nftData);

    const result = await nftRepository.save(existingNFT);
    return result;
  } catch (error) {
    throw error;
  }
};
