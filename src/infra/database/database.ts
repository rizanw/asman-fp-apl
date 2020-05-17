import { Sequelize } from "sequelize";

export default new Sequelize(
  process.env.DB_DATABASE as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as any,
    dialect: "postgres"
  }
);