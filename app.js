const express = require("express");
const http = require("http");
const websocket = require("./src/core/communication/init");
const sequelize = require("./src/core/database/init");
const router = require("./src/core/router/v1/router");
const { HttpResponse } = require("./src/core/utils/Response");
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(router);

async function TestDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log(
      "PostgreSQL database connection has been established successfully"
    );
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
}

TestDatabaseConnection();

websocket(server);

app.get("/", (req, res) => {
  return HttpResponse(res, 200, "Welcome to the Project Igniter API");
});

app.use((_, res, __) => {
  return HttpResponse(res, 404, "Sorry, but the content does not exist");
});

server.listen(PORT, () => {
  console.log(`Server has started at PORT ${PORT}`);
});
