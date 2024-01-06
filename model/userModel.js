const mongoose = require("mongoose");

//declare schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile:{
      type:String
    },
    password:{
      type:String,
      required:true
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

//delclare model
const User = mongoose.model("user",userSchema);

//export model
module.exports =User;