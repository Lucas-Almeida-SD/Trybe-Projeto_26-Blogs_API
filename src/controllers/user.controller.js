const httpStatus = require('../helpers/httpStatus');
const userService = require('../services/user.service');

const getAllUsers = async (_req, res) => {
  const users = await userService.getAllUsers();

  res.status(httpStatus.OK).json(users);
};

const create = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const token = await userService.create(displayName, email, password, image);

  if (token.error) return next(token.error);

  res.status(httpStatus.CREATED).json({ token });
};

module.exports = {
  create,
  getAllUsers,
};