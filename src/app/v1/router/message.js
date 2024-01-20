const express = require("express");
const verifyID = require("../../middlewares/verifyID");
const { GetMessages, SendMessage } = require("../controller/message");

const messageRouter = express.Router();

messageRouter.get("/v1/user/messages/sender/:senderId/receiver/:receiverId/all", verifyID, GetMessages);
messageRouter.post("v1/user/messages/create", verifyID, SendMessage);

module.exports = messageRouter;
