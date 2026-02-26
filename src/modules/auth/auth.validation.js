const Joi = require('joi');
const { USER_ROLES } = require('../user/user.model');

const registerSchema = Joi.object({
  body: Joi.object({
    firstName: Joi.string().trim().min(2).max(50).required(),
    lastName: Joi.string().trim().min(2).max(50).required(),
    phone: Joi.string().trim().min(7).max(20).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).max(100).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'confirmPassword must match password',
    }),
    role: Joi.string()
      .valid(...Object.values(USER_ROLES))
      .required(),
  }),
  query: Joi.object().unknown(true),
  params: Joi.object().unknown(true),
});

const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required(),
  }),
  query: Joi.object().unknown(true),
  params: Joi.object().unknown(true),
});

module.exports = {
  registerSchema,
  loginSchema,
};

