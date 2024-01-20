const { HttpResponse } = require("../../../core/utils/Response");
const Message = require("../model/message");

const GetMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const Messages = await Message.findAll({ where: { senderId, receiverId } });
    console.log("me")
    return HttpResponse(res, 200, "Messages fetched successfully", Messages);
  } catch (error) {
    return HttpResponse(res, 500, error.toString());
  }
};

const SendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.params;
    const newMessage = await Message.create({
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

module.exports = { GetMessages, SendMessage };
