const httpStatus = require('../helpers/httpStatus');
const categoryService = require('../services/category.service');

const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();

  res.status(httpStatus.OK).json(categories);
};

const create = async (req, res) => {
  const { name } = req.body;

  const category = await categoryService.create(name);

  res.status(httpStatus.CREATED).json(category);
};

module.exports = {
  getAllCategories,
  create,
};
