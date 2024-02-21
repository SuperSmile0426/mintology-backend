import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const dataSourceOptions: DataSourceOptions = {
  type: "mongodb",
  url: process.env.DB_HOST,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: ["dist/server/entities/*{.ts,.js}"],
  migrations: ["dist/server/migrations/*.js"],
  namingStrategy: new SnakeNamingStrategy(),
};

export default new DataSource({
  ...dataSourceOptions,
});
