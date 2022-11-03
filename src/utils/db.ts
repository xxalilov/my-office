import { Sequelize } from "sequelize";

const sequelize = new Sequelize("my-office", "postgres", "postgres", {
  dialect: "postgres",
  host: "localhost",
});

export { sequelize };
