import { Sequelize } from "sequelize";
import { DB } from "./config.js";

export const sequelize = new Sequelize(
  DB.NAME,
  DB.USER,
  DB.PWD,
  {
    host: DB.HOST,
    port: DB.PORT,
    dialect: "postgres",
    logging: false,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `PostgreSQL connected: ${DB.HOST}/${DB.NAME}`.cyan.underline
    );
  } catch (error) {
    console.error(
      `PostgreSQL connection error: ${error.message}`.red.bold
    );
    process.exit(1);
  }
};
