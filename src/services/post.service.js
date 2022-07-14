const { BlogPost, Category, PostCategory } = require('../database/models');
const generateError = require('../helpers/generateError');

const validatePost = (title, content, categoryIds) => (
  title && content && categoryIds && categoryIds.length > 0
);

const validateCategoryIds = async (categoryIds) => {
  const categories = await Category.findAll();

  const categoryIdsInTheDB = categories.map((category) => category.id);

  return categoryIds.filter((id) => categoryIdsInTheDB.includes(id));
};

const create = async (userId, title, content, categoryIds) => {
  const isPostValid = validatePost(title, content, categoryIds);
  if (!isPostValid) {
    return generateError('BAD_REQUEST', 'Some required fields are missing');
  }

  const checkCategoryIds = await validateCategoryIds(categoryIds);
  if (checkCategoryIds.length === 0) return generateError('BAD_REQUEST', '"categoryIds" not found');

  const post = await BlogPost.create({ userId, title, content });

  await Promise.all(checkCategoryIds.map((id) => (
    PostCategory.create({ postId: post.id, categoryId: id }))));

  return post;
};

module.exports = {
  create,
};