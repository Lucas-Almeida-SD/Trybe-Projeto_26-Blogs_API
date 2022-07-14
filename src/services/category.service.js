const { Category } = require('../database/models');
const generateError = require('../helpers/generateError');
const httpStatus = require('../helpers/httpStatus');

const getAllCategories = async () => {
  const categories = await Category.findAll();

  return categories;
};

const create = async (name) => {
  if (!name) throw generateError(httpStatus.BAD_REQUEST, '"name" is required');

  const category = await Category.create({ name });

  return category;
};

module.exports = {
  getAllCategories,
  create,
};
