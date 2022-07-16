const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const validateToken = (token) => {
  try {
    const verifyToken = jwt.verify(token, secret);

    return verifyToken.data;
  } catch (err) {
    return err;
  }
};

module.exports = { validateToken };