const { Category } = require('../database/models');
const generateError = require('../helpers/generateError');

const create = async (name) => {
  if (!name) return generateError('BAD_REQUEST', '"name" is required');

  const category = await Category.create({ name });

  return category;
};

module.exports = {
  create,
};
