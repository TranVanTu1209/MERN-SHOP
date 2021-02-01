const jwt = require("jsonwebtoken");

const generateJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = { generateJwtToken };
