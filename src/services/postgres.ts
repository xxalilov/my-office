import { sequelize } from "../utils/db";

const db = async function () {
  try {
    await sequelize.sync({ force: false });
  } catch (err) {
    console.error(err);
  }
};

export { db };
