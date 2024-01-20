const express = require("express");
const { CreateAccount, DeleteAccount } = require("../controller/account");

const accountRouter = express.Router();

accountRouter.post("/v1/auth/account", CreateAccount);
accountRouter.delete("v1/auth/account", DeleteAccount);

module.exports = accountRouter;
