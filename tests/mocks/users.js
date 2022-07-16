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

module.exports = {
  allUsers,
  correctBodyOfLoginRequest,
  incorrectBodyOfLoginRequest,
};
