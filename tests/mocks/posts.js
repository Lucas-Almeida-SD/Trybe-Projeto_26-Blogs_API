const invalidToken = { authorization: 'invalid_token' };

allPosts = [
  {
    id: 1,
    title: 'Post do Ano',
    content: 'Melhor post do ano',
    userId: 1,
    published: new Date('2011-08-01T19:58:00.000Z'),
    updated: new Date('2011-08-01T19:58:51.000Z'),
  },
  {
    id: 2,
    title: 'Vamos que vamos',
    content: 'Foguete não tem ré',
    userId: 1,
    published: new Date('2011-08-01T19:58:00.000Z'),
    updated: new Date('2011-08-01T19:58:51.000Z'),
  },
];

const correctPostReqBody = {
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "categoryIds": [1, 2]
};

const nonExistentCategoryPostReqBody = {
  title: "Latest updates, August 1st",
  content: "The whole text for the blog post goes here in this key",
  categoryIds: [9999],
};

module.exports = {
  invalidToken,
  allPosts,
  correctPostReqBody,
  nonExistentCategoryPostReqBody,
};
