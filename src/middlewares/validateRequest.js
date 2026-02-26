const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const validateRequest = (schema) => (req, res, next) => {
  const data = {
    body: req.body,
    query: req.query,
    params: req.params,
  };

  const { error, value } = schema.validate(data, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });

  if (error) {
    const details = error.details.map((d) => d.message);
    return next(new ApiError(httpStatus.BAD_REQUEST, 'Validation error', details));
  }

  req.body = value.body || req.body;
  req.query = value.query || req.query;
  req.params = value.params || req.params;

  return next();
};

module.exports = validateRequest;

