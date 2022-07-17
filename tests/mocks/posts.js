const invalidToken = { authorization: 'invalid_token' };

allPosts = [
  {
    id: 1,
    title: "Post do Ano",
    content: "Melhor post do ano",
    userId: 1,
    published: "2011-08-01T19:58:00.000Z",
    updated: "2011-08-01T19:58:51.000Z",
    user: {
      id: 1,
      displayName: "Lewis Hamilton",
      email: "lewishamilton@gmail.com",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    categories: [
      {
        id: 1,
        name: "Inovação"
      }
    ]
  },
  { 
    id: 2,
    title: 'Vamos que vamos',
    content: 'Foguete não tem ré',
    userId: 1,
    published: "2011-08-01T19:58:00.000Z",
    updated: "2011-08-01T19:58:51.000Z",
    user: {
      id: 1,
      displayName: "Lewis Hamilton",
      email: "lewishamilton@gmail.com",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    categories: [
      {
        id: 2,
        name: "Escola"
      }
    ]
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
