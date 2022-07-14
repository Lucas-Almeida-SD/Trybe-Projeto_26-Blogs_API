const httpStatus = require('../helpers/httpStatus');
const categoryService = require('../services/category.service');

const create = async (req, res, next) => {
  const { name } = req.body;

  const category = await categoryService.create(name);

  if (category.error) return next(category.error);

  res.status(httpStatus.CREATED).json(category);
};

module.exports = {
  create,
};
