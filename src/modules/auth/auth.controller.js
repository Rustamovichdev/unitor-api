const httpStatus = require('http-status');

const catchAsync = require('../../utils/catchAsync');
const authService = require('./auth.service');

const register = catchAsync(async (req, res) => {
  const result = await authService.register(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    },
  });
});

const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Login successful',
    data: {
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    },
  });
});

module.exports = {
  register,
  login,
};

