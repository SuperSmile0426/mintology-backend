import "dotenv/config";
import { DataSourceOptions } from "typeorm";

import { CoreModel, UserModel, NFTModel } from "models";

export const dbOptions: DataSourceOptions = {
  type: "mongodb",
  url: process.env.DB_HOST,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  logging: false,
  synchronize: false,
  entities: [CoreModel, UserModel, NFTModel],
  extra: {
    connectionLimit: 10,
  },
};
