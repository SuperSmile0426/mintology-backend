import { ObjectId } from "mongodb";

import { getUserRepository } from "utils";

export const createUser = async (userData) => {
  try {
    const userRepository = await getUserRepository();

    const result = await userRepository.save(userData);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const userRepository = await getUserRepository();
    const user = await userRepository.findOne({ where: { email } });

    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const objectId = new ObjectId(id);
    const userRepository = await getUserRepository();
    const user = await userRepository.findOne({ where: { _id: objectId } });
    return user;
  } catch (error) {
    throw error;
  }
};
