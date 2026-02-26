const express = require('express');

const validateRequest = require('../../middlewares/validateRequest');
const { registerSchema, loginSchema } = require('./auth.validation');
const authController = require('./auth.controller');

const router = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *           example:
 *             firstName: John
 *             lastName: Doe
 *             phone: "+1 555 123 4567"
 *             email: john.doe@example.com
 *             password: StrongPassword123
 *             confirmPassword: StrongPassword123
 *             role: Owner
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               success: true
 *               message: User registered successfully
 *               data:
 *                 user:
 *                   id: c0a80123-4567-89ab-cdef-0123456789ab
 *                   firstName: John
 *                   lastName: Doe
 *                   phone: "+1 555 123 4567"
 *                   email: john.doe@example.com
 *                   role: Owner
 *                 accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Validation error
 *               details:
 *                 - '"email" must be a valid email'
 *                 - '"password" length must be at least 8 characters long'
 *       409:
 *         description: Email already registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Email is already registered
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/register', validateRequest(registerSchema), authController.register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             email: john.doe@example.com
 *             password: StrongPassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               success: true
 *               message: Login successful
 *               data:
 *                 user:
 *                   id: c0a80123-4567-89ab-cdef-0123456789ab
 *                   firstName: John
 *                   lastName: Doe
 *                   phone: "+1 555 123 4567"
 *                   email: john.doe@example.com
 *                   role: Owner
 *                 accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Validation error
 *               details:
 *                 - '"email" must be a valid email'
 *                 - '"password" is required'
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Invalid email or password
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/login', validateRequest(loginSchema), authController.login);

module.exports = router;
