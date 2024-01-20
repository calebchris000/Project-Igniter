const WebSocket = require("ws");

const clients = new Map();

module.exports = async function (server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, req) => {
    ws.on("open", () => {
      console.log("websocket is opened");
    });

    ws.on("close", () => {
      console.log("WebSocket is closed");
    });
    ws.on("error", (error) => {
      console.log(error);
    });

    ws.on("message", (message) => {});
  });
};
