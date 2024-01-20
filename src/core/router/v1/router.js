const express = require("express");
const accountRouter = require("../../../app/v1/router/account");
const messageRouter = require("../../../app/v1/router/message");

const router = express.Router();

router.use(accountRouter);
router.use(messageRouter);

module.exports = router;
