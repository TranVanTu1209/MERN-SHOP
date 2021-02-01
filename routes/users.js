const express = require("express");
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
} = require("../controllers/user-controllers");
const router = express.Router();
const { protect, admin } = require("../middlewares/authMiddlewares");

router.post("/login", authUser);
router.post("/register", registerUser);
router.route("/profile").put(protect, updateUserProfile);
router.route("/profile").get(protect, getUserProfile);
router.route("/").get(protect, admin, getUsers);

module.exports = router;
