const bcrypt = require('bcrypt');
const httpStatus = require('http-status');

const ApiError = require('../../utils/ApiError');
const {
  createUser,
  findUserByEmail,
  USER_ROLES,
} = require('../user/user.model');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../../utils/token');

const SALT_ROUNDS = 10;

const register = async (payload) => {
  const { firstName, lastName, phone, email, password, role } = payload;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, 'Email is already registered');
  }

  if (!Object.values(USER_ROLES).includes(role)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid role');
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await createUser({
    firstName,
    lastName,
    phone,
    email: email.toLowerCase(),
    passwordHash,
    role,
  });

  const tokens = generateTokensForUser(user);

  return {
    user: sanitizeUser(user),
    ...tokens,
  };
};

const login = async ({ email, password }) => {
  const user = await findUserByEmail(email.toLowerCase());

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  const tokens = generateTokensForUser(user);

  return {
    user: sanitizeUser(user),
    ...tokens,
  };
};

const generateTokensForUser = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
    email: user.email,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return { accessToken, refreshToken };
};

const sanitizeUser = (user) => ({
  id: user.id,
  firstName: user.first_name,
  lastName: user.last_name,
  phone: user.phone,
  email: user.email,
  role: user.role,
});

module.exports = {
  register,
  login,
};

