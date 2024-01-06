const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn"); // import isLoggedIn custom middleware

const {
  handleGetAllUser,
  handleSaveUser,
  handleFindUserById,
  handleUserUpdate,
  handleDeleteUser,
  handleLogin,
} = require("../controller/userController");

router.get("/", isLoggedIn, handleGetAllUser); //show all user
router.post("/", handleSaveUser); //create user || signup
router.get("/:id", isLoggedIn, handleFindUserById); //show single user by ID
router.patch("/:id", isLoggedIn, handleUserUpdate); //update user by ID
router.delete("/:id", isLoggedIn, handleDeleteUser); //delete user by ID
router.post("/login", handleLogin); //LOGIN
module.exports = router;
