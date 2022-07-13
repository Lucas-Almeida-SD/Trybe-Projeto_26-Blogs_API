const httpStatus = require('./httpStatus');

const generateError = (code, message) => ({
  error: { code: httpStatus[code], message },
});

module.exports = generateError;
