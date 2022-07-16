const Sequelize = require('sequelize');
const { User, BlogPost, PostCategory } = require('../database/models');
const encryptPassword = require('../helpers/encryptPassword');
const generateError = require('../helpers/generateError');
const generateToken = require('../helpers/generateToken');
const httpStatus = require('../helpers/httpStatus');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const validateDisplayName = (displayName) => (displayName && displayName.length >= 8);

const validateEmail = (email) => (email && /\S+@\S+\.com/gi.test(email));

const validatePassword = (password) => (password && password.length >= 6);

const validateUser = (displayName, email, password, image) => {
  const displayNameMessage = '"displayName" length must be at least 8 characters long';
  const emailMessage = '"email" must be a valid email';
  const passwordMessage = '"password" length must be at least 6 characters long';
  const imageMessage = '"image" is required';

  switch (true) {
    case (!validateDisplayName(displayName)):
      throw generateError(httpStatus.BAD_REQUEST, displayNameMessage);
    case (!validateEmail(email)):
      throw generateError(httpStatus.BAD_REQUEST, emailMessage);
    case (!validatePassword(password)):
      throw generateError(httpStatus.BAD_REQUEST, passwordMessage);
    case (!image):
      throw generateError(httpStatus.BAD_REQUEST, imageMessage);
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

  if (!user) throw generateError(httpStatus.NOT_FOUND, 'User does not exist');

  return user;
};

const create = async (displayName, email, password, image) => {
  validateUser(displayName, email, password, image);

  const checkIfEmailExists = await User.findOne({ where: { email } });

  if (checkIfEmailExists) throw generateError(httpStatus.CONFLICT, 'User already registered');

  const encryptedPassword = encryptPassword(password);
  const user = await User.create({ displayName, email, password: encryptedPassword, image });

  const token = generateToken(user);

  return token;
};

const exclude = async (userId) => {
  const t = await sequelize.transaction();

  try {
    const posts = await BlogPost.findAll({ where: { userId } });

    await Promise.all(
      posts.map((post) => (
        PostCategory.destroy({ where: { postId: post.id } }, { transaction: t }))),
    );

    await BlogPost.destroy({ where: { userId } }, { transaction: t });
  
    await User.destroy({ where: { id: userId } }, { transaction: t });

    await t.commit();
  } catch (err) {
    await t.rollback();
    throw generateError(null, 'Operation failed');
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  create,
  exclude,
};
