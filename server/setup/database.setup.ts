import { MESSAGES } from "../constants";

import { DBConnect, Logger } from "utils";

const databaseSetup = async (next: () => void) => {
  return await DBConnect.dbConnection()
    .then(() => {
      Logger.log(MESSAGES.DATABASE_CONNECTION_SUCCESS);
      next();
    })
    .catch((error) => {
      Logger.log(error);
      Logger.error(MESSAGES.DATABASE_CONNECTION_FAILURE);
    });
};

export default databaseSetup;
