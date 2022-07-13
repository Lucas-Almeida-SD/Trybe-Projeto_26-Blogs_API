const { Op } = require('sequelize');
const { User } = require('../database/models');
const generateError = require('../helpers/generateError');
const generateToken = require('../helpers/generateToken');

const getToken = async (email, password) => {
  if (!email || !password) {
    return generateError('BAD_REQUEST', 'Some required fields are missing');
  }

  const user = await User.findOne({ where: { [Op.and]: [{ email }, { password }] } });

  if (!user) return generateError('BAD_REQUEST', 'Invalid fields');

  const token = generateToken(user);

  return token;
};

module.exports = {
  getToken,
};