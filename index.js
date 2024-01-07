require("dotenv").config();
const express = require("express");
const app = express();
const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./middlewares/log");
var cookieParser = require('cookie-parser')

const userRouter = require("./routes/userRoute");

//Middlewares
// app.use(logReqRes("log.txt"));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true}))

//Route
app.get("/", (req, res) => {
  res.send("welcome to api 🙏🏻");
});
app.use("/user", userRouter);

//Server

app.listen(process.env.PORT, () => {
  console.log("Server started on port :", process.env.PORT);
});

//Connecting to Db - MongoDB
// Local--
connectMongoDb("mongodb://127.0.0.1:27017/2024db");
//Atlas
//connectMongoDb(process.env.MONGODB_URI);
