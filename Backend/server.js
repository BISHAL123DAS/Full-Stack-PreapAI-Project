require("dotenv").config();

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = require("./src/app");
const connectToDB = require("./src/config/database");

connectToDB();

module.exports = app;