const express = require("express");
const verifyID = require("../../middlewares/verifyID");
const { GetMessages, SendMessage, SavePendingMessage, DeletePendingMessages } = require("../controller/message");

const messageRouter = express.Router();

messageRouter.get("/v1/user/messages/sender/:senderId/receiver/:receiverId/all", verifyID, GetMessages);
messageRouter.post("/v1/user/messages/sender/:senderId/receiver/:receiverId/create", verifyID, SendMessage);
messageRouter.post('/v1/user/messages/sender/:senderId/receiver/:receiverId/pending', verifyID, SavePendingMessage)
messageRouter.delete('/v1/user/messages/receiver/:receiverId/pending', verifyID, DeletePendingMessages)
module.exports = messageRouter;
