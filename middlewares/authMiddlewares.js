const User = require("../models/User");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization
      : "";
  if (token) token = token.split(" ")[1];
  else
    return res.status(401).json({ msg: "Not authorized. No token provided" });
  let decoded;
  try {
    decoded = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ msg: error.message });
  }
  let user;
  try {
    user = await User.findById(decoded.id);
  } catch (error) {
    return res.status(500).json({ msg: "Server error when finding user" });
  }
  if (!user) return res.status(404).json({ msg: "Can not find user" });
  req.user = { id: decoded.id, isAdmin: user.isAdmin };
  next();
};

const admin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = { protect, admin };
