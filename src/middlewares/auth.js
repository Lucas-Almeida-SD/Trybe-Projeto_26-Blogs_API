const jwt = require('jsonwebtoken');
const generateError = require('../helpers/generateError');
const httpStatus = require('../helpers/httpStatus');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const validateToken = (token) => {
  const verifyToken = jwt.verify(token, secret);

  return verifyToken;
};

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) throw generateError(httpStatus.UNAUTHORIZED, 'Token not found');

  try {
    const isTokenValid = validateToken(token);

    req.user = isTokenValid.data;
  
    next();
  } catch (_err) {
    next(generateError(httpStatus.UNAUTHORIZED, 'Expired or invalid token'));
  }
};

module.exports = auth;
