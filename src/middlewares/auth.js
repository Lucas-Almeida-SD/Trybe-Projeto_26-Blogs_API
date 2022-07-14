const jwt = require('jsonwebtoken');
const generateError = require('../helpers/generateError');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const validateToken = (token) => {
  if (!token) return generateError('UNAUTHORIZED', 'Token not found');

  const verifyToken = jwt.verify(token, secret);

  return verifyToken;
};

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const isTokenValid = validateToken(token);
  
    if (isTokenValid.error) return next(isTokenValid.error);

    req.user = isTokenValid.data;
  
    next();
  } catch (err) {
    next(generateError('UNAUTHORIZED', 'Expired or invalid token').error);
  }
};

module.exports = auth;
