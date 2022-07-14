const Sequelize = require('sequelize');
const { BlogPost, Category, PostCategory, User } = require('../database/models');
const generateError = require('../helpers/generateError');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const validatePost = (title, content, categoryIds) => {
  if (!title || !content || !categoryIds || !categoryIds.length > 0) {
    throw generateError('BAD_REQUEST', 'Some required fields are missing');
  }
};

const validateCategoryIds = async (categoryIds) => {
  const categories = await Category.findAll();

  const categoryIdsInTheDB = categories.map((category) => category.id);

  const newCategoryIds = categoryIds.filter((id) => categoryIdsInTheDB.includes(id));

  if (newCategoryIds.length === 0) throw generateError('BAD_REQUEST', '"categoryIds" not found');

  return newCategoryIds;
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({ 
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) throw generateError('NOT_FOUND', 'Post does not exist');

  return post;
};

const create = async (userId, title, content, categoryIds) => {
  validatePost(title, content, categoryIds);

  const checkCategoryIds = await validateCategoryIds(categoryIds);

  const t = await sequelize.transaction();

  try {
    const post = await BlogPost.create({ userId, title, content }, { transaction: t });
  
    await Promise.all(checkCategoryIds.map((id) => (
      PostCategory.create({ postId: post.id, categoryId: id }, { transaction: t }))));

    await t.commit();
  
    return post;
  } catch (err) {
    await t.rollback();
    throw generateError(null, 'Operation failed');
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  create,
};