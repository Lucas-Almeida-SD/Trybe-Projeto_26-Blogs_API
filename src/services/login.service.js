const bcrypt = require('bcryptjs'); 
const { User } = require('../database/models');
const generateError = require('../helpers/generateError');
const generateToken = require('../helpers/generateToken');
const httpStatus = require('../helpers/httpStatus');

const validatePassword = (password, passwordInTheDB) => {
  if (!bcrypt.compareSync(password, passwordInTheDB) && password !== passwordInTheDB) {
    throw generateError(httpStatus.UNAUTHORIZED, 'Invalid fields');
  }
};

const getToken = async (email, password) => {
  if (!email || !password) {
    throw generateError(httpStatus.BAD_REQUEST, 'Some required fields are missing');
  }

  const user = await User.findOne({ where: { email } });

  if (!user) throw generateError(httpStatus.BAD_REQUEST, 'Invalid fields');

  validatePassword(password, user.password);

  const token = generateToken(user);

  return token;
};

module.exports = {
  getToken,
};