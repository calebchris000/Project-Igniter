const { HttpResponse } = require("../../../core/utils/Response");
const uuid = require("uuid");
const Message = require("../model/message");
const websocket = require("../../../core/communication/chat/connection");

const GetMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const Messages = await Message.findAll({ where: { senderId, receiverId } });
    console.log("me");
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

    websocket.send(JSON.stringify({ receiverId, content }));
    return HttpResponse(res, 201, "Message successfully sent", newMessage);
  } catch (error) {
    return HttpResponse(res, 500, error.toString());
  }
};

module.exports = { GetMessages, SendMessage };
