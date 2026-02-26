const swaggerJsdoc = require('swagger-jsdoc');
const env = require('./env');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GYM CRM API',
      version: '1.0.0',
      description:
        'API documentation for the GYM CRM backend. This documentation currently covers authentication endpoints and core schemas. Additional modules (members, subscriptions, payments, attendance, etc.) can be documented here later.',
    },
    servers: [
      {
        url: `http://localhost:${env.port}`,
        description: `${env.nodeEnv} server`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              example: 'c0a80123-4567-89ab-cdef-0123456789ab',
            },
            firstName: {
              type: 'string',
              example: 'John',
            },
            lastName: {
              type: 'string',
              example: 'Doe',
            },
            phone: {
              type: 'string',
              example: '+1 555 123 4567',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com',
            },
            role: {
              type: 'string',
              enum: ['Owner', 'Manager', 'Trainer', 'Client'],
              example: 'Owner',
            },
          },
        },
        RegisterRequest: {
          type: 'object',
          required: [
            'firstName',
            'lastName',
            'phone',
            'email',
            'password',
            'confirmPassword',
            'role',
          ],
          properties: {
            firstName: {
              type: 'string',
              example: 'John',
            },
            lastName: {
              type: 'string',
              example: 'Doe',
            },
            phone: {
              type: 'string',
              example: '+1 555 123 4567',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'StrongPassword123',
            },
            confirmPassword: {
              type: 'string',
              format: 'password',
              example: 'StrongPassword123',
            },
            role: {
              type: 'string',
              enum: ['Owner', 'Manager', 'Trainer', 'Client'],
              example: 'Owner',
            },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'StrongPassword123',
            },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Login successful',
            },
            data: {
              type: 'object',
              properties: {
                user: {
                  $ref: '#/components/schemas/User',
                },
                accessToken: {
                  type: 'string',
                  description: 'JWT access token',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
                refreshToken: {
                  type: 'string',
                  description: 'JWT refresh token',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
              },
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Validation error',
            },
            details: {
              type: 'array',
              description: 'Optional list of validation or error details',
              items: {
                type: 'string',
              },
              example: ['"email" must be a valid email', '"password" is required'],
            },
          },
        },
      },
    },
  },
  apis: ['src/modules/**/*.routes.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

