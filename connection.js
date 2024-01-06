const mongoose = require("mongoose");

async function connectMongoDb(url) {
  mongoose.set("strictQuery", false);
  try {
    return mongoose.connect(url).then(() => {
      console.log("Connected to mongo db");
    });
  } catch (err) {
    console.log("Failed to connect to mongo db");
  }
}

module.exports = { connectMongoDb };
