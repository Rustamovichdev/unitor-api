const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { verifyAccessToken } = require('../utils/token');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Authentication required'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    return next();
  } catch (err) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Invalid or expired token'));
  }
};

module.exports = auth;

