const { HttpResponse } = require("../../core/utils/Response");
const Account = require("../v1/model/account");

const verifyID = async (req, res, next) => {
  try {
    const { senderId, receiverId, accountId } = req.params;

    if (senderId && receiverId) {
      const senderAccount = await Account.findOne({ where: { id: senderId } });
      const receiverAccount = await Account.findOne({
        where: { id: receiverId },
      });
      if (!senderAccount || !receiverAccount) {
        return HttpResponse(
          res,
          400,
          !senderAccount
            ? "Sender account does not exist"
            : "Receiver account does not exist"
        );
      }
      next();
    }

    if (senderId) {
      const senderAccount = await Account.findOne({ where: { id: senderId } });
      if (!senderAccount) {
        return HttpResponse(res, 400, "Sender account does not exist");
      }
      next();
    }

    if (receiverId) {
      const senderAccount = await Account.findOne({
        where: { id: receiverId },
      });
      if (!senderAccount) {
        return HttpResponse(res, 400, "Receiver account does not exist");
      }
      next();
    }

    if (accountId) {
      const userAccount = await Account.findOne({ where: { id: accountId } });

      if (!userAccount) {
        return HttpResponse(res, 400, "Sender account does not exist");
      }
      next();
    }
  } catch (error) {
    return HttpResponse(res, 500, error.toString());
  }
};

module.exports = verifyID;
