const WebSocket = require('ws');
require('dotenv').config()

const connectionString = process.env.WEBSOCKET_SERVER
const websocket = new WebSocket(connectionString)

module.exports = websocket