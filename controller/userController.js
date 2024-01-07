const User = require("../model/userModel");
const bcrypt = require("bcryptjs"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken");
require("dotenv").config();

//show all users--------------------------------------------------------
async function handleGetAllUser(req, res) {
  try {
    const allDbUser = await User.find();
    return res
      .status(200)
      .json({ message: "success", data: allDbUser, cookie: req.cookies.token });
  } catch (err) {
    return res.status(500).json(err);
  }
}

//Create new user---------------------------------------------------
async function handleSaveUser(req, res) {
  try {
    //create new user

    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.email ||
      !req.body.gender ||
      !req.body.password
    ) {
      return res.end("firstName,lastName,email,gender,password --required");
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gender: req.body.gender,
      password: req.body.password,
    });
    // await newUser
    //   .save()
    //   .then(() =>
    //   res.json(User));
    const user = await User.create(newUser);
    res.status(201).json({ message: "register success", data: user._id });
  } catch (err) {
    if (err.code === 11000) {
      // Check if the error is due to a unique index violation.
      return res
        .status(400)
        .json({ message: "Email already in use.", success: false });
    } else {
      console.error(err);
      return res.status(500).json({ message: "Internal server error." });
    }
  }
}

//Find usee by id-------------------------------------------------------------
handleFindUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      // Check if the user was not found
      return res.status(404).json({ message: "User not found." });
    }
    res.json(user); // Send the user object as a response
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

//Update user by id---------
async function handleUserUpdate(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const update = await User.findByIdAndUpdate(user, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gender: req.body.gender,
    });
    res.status(200).json({ updae: "success", date: update });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
}

//user delete by id ------------------------------
async function handleDeleteUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const update = await User.findByIdAndDelete(user);
    res.status(200).json({ delete: "success", date: update });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
}

// Login route to verify a user and get a token
async function handleLogin(req, res) {
  try {
    if (!req.body.email || !req.body.password) {
      return res.end("email,password --required");
    }
    // check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      //check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // sign token and send it in response
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        res
          .status(200)
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            expiresIn: 7 * 24 * 60 * 60 * 1000,
          })
          .json({ message: "login success", token: token });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports = {
  handleGetAllUser,
  handleSaveUser,
  handleFindUserById,
  handleUserUpdate,
  handleDeleteUser,
  handleLogin,
};
