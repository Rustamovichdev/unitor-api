const httpStatus = require('http-status');
const env = require('../config/env');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

  const response = {
    success: false,
    message: err.message || 'Internal Server Error',
  };

  if (err.details) {
    response.details = err.details;
  }

  if (env.nodeEnv === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;

