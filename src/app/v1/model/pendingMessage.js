const sequelize = require("../../../core/database/init");
const { DataTypes } = require("sequelize");

const PendingMessage = sequelize.define("PendingMessage", {
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
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = PendingMessage;
