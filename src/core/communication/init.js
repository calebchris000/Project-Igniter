const WebSocket = require("ws");
const url = require("url");
const uuid = require("uuid");
const PendingMessage = require("../../app/v1/model/pendingMessage");
const Message = require("../../app/v1/model/message");
const clients = new Map();

module.exports = async function (server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", async (ws, req) => {
    try {
      const query = url.parse(req.url, true).query;
      const clientId = query.clientId;
      if (clientId) clients.set(clientId, ws);

      const pendingMessages = await PendingMessage.findAll({
        where: { receiverId: clientId },
      });

      console.log(pendingMessages.length, "HERRR");
      if (pendingMessages.length) {
        ws.send(`${JSON.stringify(pendingMessages)}`);
        await PendingMessage.destroy({ where: { receiverId: clientId } });
      }
      console.log(`WebSocket client (${clientId}) is connected`);

      ws.on("error", (error) => {
        console.log(error);
      });

      ws.on("message", async (message) => {
        const parsed = JSON.parse(message);

        const { receiverId } = parsed;
        const messageId = uuid.v4();
        if (!clients.has(receiverId)) {
          try {
            await PendingMessage.create({
              id: messageId,
              senderId: clientId,
              content: parsed.content,
              receiverId,
            });

            await Message.create({
              id: uuid.v4(),
              senderId: clientId,
              receiverId,
              content: parsed.content,
            });
            console.log(parsed);
            console.log("Recipient will receive message when connected");
          } catch (error) {
            console.log(error);
          }
          return;
        }

        const recipient = clients.get(receiverId);
        recipient.send(`${message}`);
        console.log("Message sent");
      });

      ws.on("close", () => {
        clients.delete(clientId);
        console.log(`WebSocket client (${clientId}) is closed`);
      });
    } catch (error) {
      console.log(error);
      return;
    }
  });
};
