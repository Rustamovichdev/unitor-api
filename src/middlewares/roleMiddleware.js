const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const authorizeRoles = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !req.user.role) {
    return next(new ApiError(httpStatus.FORBIDDEN, 'Access denied'));
  }

  if (!allowedRoles.includes(req.user.role)) {
    return next(new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to access this resource'));
  }

  return next();
};

module.exports = authorizeRoles;

