const express = require("express");
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUserById,
} = require("../controllers/user-controllers");
const router = express.Router();
const { protect, admin } = require("../middlewares/authMiddlewares");

router.post("/login", authUser);
router.post("/register", registerUser);
router.route("/profile").put(protect, updateUserProfile);
router.route("/profile").get(protect, getUserProfile);
router.route("/").get(protect, admin, getUsers);
router.route("/:id").delete(protect, admin, deleteUser);
router.route("/:id").get(protect, admin, getUserById);
router.route("/:id").put(protect, admin, updateUserById);

module.exports = router;
