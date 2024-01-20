const { HttpResponse } = require("../../../core/utils/Response");
const uuid = require("uuid");
const Account = require("../model/account");
const bcrypt = require("bcrypt");
require("dotenv").config();

const CreateAccount = async (req, res) => {
  try {
    const { userName, password, confirmPassword } = req.body;

    const accountExist = await Account.findOne({ where: { userName } });

    if (accountExist) {
      return HttpResponse(res, 400, `${userName} already exist`);
    }

    if (password !== confirmPassword) {
      return HttpResponse(res, 400, "Password does not match");
    }

    const saltRound = Number(process.env.SALT_ROUND);
    console.log("salt", typeof saltRound);
    const hashed = bcrypt.hashSync(password, saltRound);

    const newAccount = await Account.create({
      id: uuid.v4(),
      userName,
      password: hashed,
    });

    return HttpResponse(res, 201, "Account created successfully", newAccount);
  } catch (error) {
    return HttpResponse(res, 500, error.toString());
  }
};

const DeleteAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const accountExist = await Account.findOne({ where: { id: accountId } });

    if (!accountExist) {
      return HttpResponse(res, 400, "Account already does not exist.");
    }

    await accountExist.destroy();

    return HttpResponse(res, 200, "Account deleted successfully");
  } catch (error) {
    return HttpResponse(res, 500, error.toString());
  }
};

module.exports = {
  CreateAccount,
  DeleteAccount,
};
