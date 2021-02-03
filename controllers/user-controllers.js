const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { generateJwtToken } = require("../utils/generateJwtToken");

// @desc Auth user and get token
// @route POST /api/v1/users/login
// @access public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateJwtToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email Or Password");
  }
});

// @desc register user and get token
// @route POST /api/v1/users/register
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User have already existed");
  }
  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateJwtToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc get user profile
// @route GET /api/v1/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (user) return res.json(user);
  else {
    res.status(404);
    throw new Error("Can not find user");
  }
});

// @desc update user profile
// @route PUT /api/v1/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    return res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
      isAdmin: updatedUser.isAdmin,
      token: generateJwtToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("Can not find user");
  }
});

// @desc get all users
// @route GET /api/v1/users
// @access Private/admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  if (users) return res.json(users);
  else {
    console.log("404");
    res.status(404);
    throw new Error("Can not find users");
  }
});

// @desc delete user
// @route DELETE /api/v1/users/:id
// @access Private

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    return res.json({ msg: "Deleted user success" });
  } else {
    res.status(404);
    throw new Error("Can not find user");
  }
});

// @desc get user by id
// @route GET /api/v1/users/:id
// @access Private/admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) return res.json(user);
  else {
    console.log("404");
    res.status(404);
    throw new Error("Can not find user");
  }
});

// @desc update user by id
// @route PUT /api/v1/users/:id
// @access Private/admin

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();
    return res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Can not find user");
  }
});

module.exports = {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUserById,
};
