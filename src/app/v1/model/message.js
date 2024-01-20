const sequelize = require("../../../core/database/init");
const { DataTypes } = require("sequelize");
const { MessageStatus } = require("../enums/Enums");

const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.UUID,
      references: {
        model: "accounts",
        key: "id",
      },
    },
    receiverId: {
      type: DataTypes.UUID,
      references: {
        model: "accounts",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM(...MessageStatus),
      defaultValue: "pending",
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

module.exports = Message;
