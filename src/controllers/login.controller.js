const httpStatus = require('../helpers/httpStatus');
const loginService = require('../services/login.service');

const getToken = async (req, res) => {
  const { email, password } = req.body;

  const token = await loginService.getToken(email, password);

  res.status(httpStatus.OK).json({ token });
};

module.exports = {
  getToken,
};
