const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFile = [
  './src/routers/user.router.js',
  './src/routers/category.router.js',
  './src/routers/post.router.js',
  './src/routers/login.router.js',
  
];

swaggerAutogen(outputFile, endpointsFile);
