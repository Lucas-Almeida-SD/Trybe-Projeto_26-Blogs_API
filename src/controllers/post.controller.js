const httpStatus = require('../helpers/httpStatus');
const postService = require('../services/post.service');

const getAllPosts = async (req, res) => {
  const posts = await postService.getAllPosts();

  res.status(httpStatus.OK).json(posts);
};

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;

  const post = await postService.create(userId, title, content, categoryIds);

  res.status(httpStatus.CREATED).json(post);
};

module.exports = {
  getAllPosts,
  create,
};