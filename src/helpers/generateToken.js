const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
  const newUser = {
    id: user.id,
    displayName: user.displayName,
    email: user.email,
    image: user.image,
  };

  const secret = process.env.JWT_SECRET;

  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: newUser }, secret, jwtConfig);

  return token;
};

module.exports = generateToken;
