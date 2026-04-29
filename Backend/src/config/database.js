const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected database");
  } catch (err) {
    console.log("error", err);
  }
}

module.exports = connectToDB;
