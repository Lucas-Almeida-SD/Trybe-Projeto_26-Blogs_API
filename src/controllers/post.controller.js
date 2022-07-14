const httpStatus = require('../helpers/httpStatus');
const postService = require('../services/post.service');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;

  const post = await postService.create(userId, title, content, categoryIds);

  res.status(httpStatus.CREATED).json(post);
};

module.exports = {
  create,
};