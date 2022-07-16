const invalidToken = { authorization: 'invalid_token' };

const allCategories = [
  {
    id: 1,
    name: 'Inovação',
  },
  {
    id: 2,
    name: 'Escola',
  },
];

const correctCategoryReqBody = {
  name: 'Tecnologia'
};

module.exports = {
  invalidToken,
  allCategories,
  correctCategoryReqBody,
};