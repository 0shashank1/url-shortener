
require("dotenv").config();
const jwt  = require("jsonwebtoken")

const secret = process.env.secret

function createTokenForUser(user) {
  return jwt.sign({
    _id: user._id,
    email: user.email,
  }, secret);
}

function validateToken(token) {
  if(!token) return null;
  try {
    return jwt.verify(token , secret);  
  } catch (error) {
    return null;
  }
}

module.exports = {
  createTokenForUser,
  validateToken,
};