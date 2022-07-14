const { User } = require('../database/models');
const generateError = require('../helpers/generateError');
const generateToken = require('../helpers/generateToken');

const validateDisplayName = (displayName) => (displayName && displayName.length >= 8);

const validateEmail = (email) => (email && /\S+@\S+\.com/gi.test(email));

const validatePassword = (password) => (password && password.length >= 6);

const validateUser = (displayName, email, password) => {
  const displayNameMessage = '"displayName" length must be at least 8 characters long';
  const emailMessage = '"email" must be a valid email';
  const passwordMessage = '"password" length must be at least 6 characters long';

  switch (true) {
    case (!validateDisplayName(displayName)):
      throw generateError('BAD_REQUEST', displayNameMessage);
    case (!validateEmail(email)):
      throw generateError('BAD_REQUEST', emailMessage);
    case (!validatePassword(password)):
      throw generateError('BAD_REQUEST', passwordMessage);
    default:
      return true;
  }
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });

  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: ['id', 'displayName', 'email', 'image'],
  });

  if (!user) throw generateError('NOT_FOUND', 'User does not exist');

  return user;
};

const create = async (displayName, email, password, image) => {
  validateUser(displayName, email, password);

  const checkIfEmailExists = await User.findOne({ where: { email } });

  if (checkIfEmailExists) throw generateError('CONFLICT', 'User already registered');

  const user = await User.create({ displayName, email, password, image });

  const token = generateToken(user);

  return token;
};

module.exports = {
  getAllUsers,
  getUserById,
  create,
};
