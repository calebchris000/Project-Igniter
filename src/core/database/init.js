const Sequelize = require("sequelize").Sequelize;
require("dotenv").config();

const connectionString = process.env.POSTGRES_URL;

const sequelize = new Sequelize(connectionString, {});
sequelize.sync();
module.exports = sequelize;
