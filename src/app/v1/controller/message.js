const { HttpResponse } = require("../../../core/utils/Response");
const uuid = require("uuid");
const Message = require("../model/message");
const PendingMessage = require("../model/pendingMessage");
const Account = require("../model/account");

const GetMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const Messages = await Message.findAll({ where: { senderId, receiverId } });
    return HttpResponse(res, 200, "Messages fetched successfully", Messages);
  } catch (error) {
    return HttpResponse(res, 500, error.toString());
  }
};

const SendMessage = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    const { content } = req.body;
    const newMessage = await Message.create({
      id: uuid.v4(),
      senderId,
      receiverId,
      content,
      status: "sent",
    });

    return HttpResponse(res, 201, "Message successfully sent", newMessage);
  } catch (error) {
    return HttpResponse(res, 500, error.toString());
  }
};

const SavePendingMessage = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    const sender = await Account.findOne({ where: { id: senderId } });
    const receiver = await Account.findOne({ where: { id: receiverId } });

    if (!sender || !receiver) {
      return HttpResponse(
        res,
        404,
        `${!sender ? "Sender's" : "Receiver's"} account does not exist`
      );
    }

    const newPendingMessage = await PendingMessage.create({ ...req.body });

    return HttpResponse(
      res,
      201,
      `${receiver.userName} would receive message when connected`,
      newPendingMessage
    );
  } catch (error) {
    return HttpResponse(res, 500, error.toString());
  }
};

const DeletePendingMessages = async (req, res) => {
  try {
    const { receiverId } = req.params;

    const receiver = await Account.findOne({ id: receiverId });

    await PendingMessage.destroy({ where: { id: receiverId } });

    return HttpResponse(
      res,
      200,
      `All pending messages for recipient ${receiver.userName} are removed`
    );
  } catch (error) {
    return HttpResponse(res, 500, error.toString());
  }
};

module.exports = {
  GetMessages,
  SendMessage,
  SavePendingMessage,
  DeletePendingMessages,
};
