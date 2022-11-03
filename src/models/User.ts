import { Model, DataTypes } from "sequelize";
import { Password } from "../services/password";
import { sequelize } from "../utils/db";

class User extends Model {
  declare id: string;
  declare name: string;
  declare email: string;
  declare password: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);

User.beforeCreate(async (user, option) => {
  const hashedPassword = await Password.toHash(user.password);
  user.password = hashedPassword;
});

export { User };
