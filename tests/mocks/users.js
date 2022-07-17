const invalidToken = { authorization: 'invalid_token' };

const allUsers = [{
  id: 1,
  displayName: 'Lewis Hamilton',
  email: 'lewishamilton@gmail.com',
  image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
},
{
  id: 2,
  displayName: 'Michael Schumacher',
  email: 'MichaelSchumacher@gmail.com',
  image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
},
]

const correctBodyOfLoginRequest = {
  email: 'lewishamilton@gmail.com',
  password: '123456',
};

const incorrectBodyOfLoginRequest = {
  email: 'lucas@teste.com',
  password: '123456',
};

const correctUserReqBody = {
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}

const incorrectDisplayNameUserReqBody = {
  "displayName": "Brett",
  "email": "brett@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
};

const incorrectEmailUserReqBody = {
  "displayName": "Brett Wiltshire",
  "email": "@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}

const incorrectPasswordUserReqBody = {
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "password": "12345",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}

const incorrectImageUserReqBody = {
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "password": "123456",
  "image": ""
}

const emailAlreadyExistingUserReqBody = {
  "displayName": "Brett Wiltshire",
  "email": "lewishamilton@gmail.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
};

const userNotAuthorizedToUpdatePostLoginRequest = {
  email: 'MichaelSchumacher@gmail.com',
  password: '123456',
}

module.exports = {
  invalidToken,
  allUsers,
  correctBodyOfLoginRequest,
  incorrectBodyOfLoginRequest,
  correctUserReqBody,
  incorrectDisplayNameUserReqBody,
  incorrectEmailUserReqBody,
  incorrectPasswordUserReqBody,
  incorrectImageUserReqBody,
  emailAlreadyExistingUserReqBody,
  userNotAuthorizedToUpdatePostLoginRequest,
};
