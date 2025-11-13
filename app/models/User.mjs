import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

export default (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false, // handled by trigger+sequence
        field: "ID"
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: "USERNAME"
      },
      email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
        field: "EMAIL"
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: "PASSWORD"
      },
      fullName: {
        type: DataTypes.STRING(200),
        field: "FULL_NAME"
      },
      role: {
        type: DataTypes.STRING(50),
        defaultValue: "user",
        field: "ROLE"
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "CREATED_AT", // 👈 Oracle column name
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "UPDATED_AT", // 👈 Oracle column name
      },
    },
    {
      tableName: "USERS",
      schema: "SYSTEM",
      freezeTableName: true,
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

User.prototype.verifyPassword = async function (plainPassword) {
  if (!plainPassword || !this.password) {
    throw new Error("Missing password data");
  }
  return bcrypt.compare(plainPassword, this.password);
};

  return User;
};
