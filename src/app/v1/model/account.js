const sequelize = require("../../../core/database/init");
const { DataTypes } = require("sequelize");
const uuid = require("uuid");

const v4 = uuid.v4();
const Account = sequelize.define(
  "Account",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Username is required",
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required",
        },
      },
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

module.exports = Account;
