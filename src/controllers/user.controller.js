const httpStatus = require('../helpers/httpStatus');
const userService = require('../services/user.service');

const getAllUsers = async (_req, res) => {
  const users = await userService.getAllUsers();

  res.status(httpStatus.OK).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  res.status(httpStatus.OK).json(user);
};

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const token = await userService.create(displayName, email, password, image);

  res.status(httpStatus.CREATED).json({ token });
};

const exclude = async (req, res) => {
  const { id } = req.user;

  await userService.exclude(id);

  res.status(httpStatus.NO_CONTENT).end();
};

module.exports = {
  getAllUsers,
  getUserById,
  create,
  exclude,
};