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
      return generateError('BAD_REQUEST', displayNameMessage);
    case (!validateEmail(email)):
      return generateError('BAD_REQUEST', emailMessage);
    case (!validatePassword(password)):
      return generateError('BAD_REQUEST', passwordMessage);
    default:
      return {};
  }
};

const create = async (displayName, email, password, image) => {
  const isUserValid = validateUser(displayName, email, password);

  if (isUserValid.error) return { error: isUserValid.error };

  const checkIfEmailExists = await User.findOne({ where: { email } });

  if (checkIfEmailExists) return generateError('CONFLICT', 'User already registered');

  const user = await User.create({ displayName, email, password, image });

  const token = generateToken(user);

  return token;
};

module.exports = {
  create,
};