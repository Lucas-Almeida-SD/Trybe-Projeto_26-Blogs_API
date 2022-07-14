const httpStatus = require('./httpStatus');

const generateError = (code, message) => ({
  code: httpStatus[code],
  message,
});

module.exports = generateError;
