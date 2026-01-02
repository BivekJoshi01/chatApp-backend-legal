import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";

export const Chat = sequelize.define(
  "Chat",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    chatName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    isGroupChat: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    groupAdmin: {
      type: DataTypes.STRING, // third-party user ID
      allowNull: true,
    },

    latestMessageId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "chats",
  }
);
