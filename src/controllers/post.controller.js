const httpStatus = require('../helpers/httpStatus');
const postService = require('../services/post.service');

const getAllPosts = async (req, res) => {
  const posts = await postService.getAllPosts();

  res.status(httpStatus.OK).json(posts);
};

const getPostBySearch = async (req, res) => {
  const { q: search } = req.query;

  const posts = await postService.getPostBySearch(search);

  res.status(httpStatus.OK).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const post = await postService.getPostById(id);

  res.status(httpStatus.OK).json(post);
};

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;

  const post = await postService.create(userId, title, content, categoryIds);

  res.status(httpStatus.CREATED).json(post);
};

const update = async (req, res) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;
  const { title, content } = req.body;

  const post = await postService.update(postId, userId, title, content);

  res.status(httpStatus.OK).json(post);
};

const exclude = async (req, res) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;

  await postService.exclude(postId, userId);

  res.status(httpStatus.NO_CONTENT).end();
};

module.exports = {
  getAllPosts,
  getPostBySearch,
  getPostById,
  create,
  update,
  exclude,
};