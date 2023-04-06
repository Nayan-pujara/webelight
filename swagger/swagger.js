module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Webelight',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:4000',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },
  tags: [
    {
      name: 'Authentication',
    },
    {
      name: 'Users',
    },
    {
      name: 'Products',
    },
  ],
  paths: {
    '/api/v1/users/register': {
      post: {
        tags: ['Authentication'],
        summary: 'Register User',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                example: {
                  email: 'user1@yopmail.com',
                  password: 'Test@123',
                  name: 'user 1',
                  role: 'customer',
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {},
            },
          },
        },
      },
    },
    '/api/v1/users/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Login User',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                example: {
                  email: 'user1@yopmail.com',
                  password: 'Test@123',
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {},
            },
          },
        },
      },
    },
    '/api/v1/users/changePassword': {
      post: {
        tags: ['Authentication'],
        summary: 'Change Password',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                example: {
                  currentPassword: 'Pass@123',
                  newPassword: 'Test@123',
                  confirmPassword: 'Test@123',
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {},
            },
          },
        },
      },
    },
    '/api/v1/users': {
      get: {
        tags: ['Users'],
        summary: 'Get All Users',
        parameters: [{ name: 'role', in: 'query', schema: { type: 'string' } }],
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {},
            },
          },
        },
      },
    },
    '/api/v1/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Get User',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'string',
            minimum: 1,
            description: 'The user ID.',
          },
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {},
            },
          },
        },
      },
      patch: {
        tags: ['Users'],
        summary: 'Update User',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'string',
            minimum: 1,
            description: 'The user ID.',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                example: {
                  name: 'super admin',
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {},
            },
          },
        },
      },
      delete: {
        tags: ['Users'],
        summary: 'Delete User',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'string',
            minimum: 1,
            description: 'The user ID.',
          },
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {},
            },
          },
        },
      },
    },
    '/api/v1/users/getMe': {
      get: {
        tags: ['Users'],
        summary: 'Get Me',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {},
            },
          },
        },
      },
    },
    '/api/v1/users/updateMe': {
      patch: {
        tags: ['Users'],
        summary: 'Update Me',
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  profilePic: {
                    type: 'string',
                    format: 'binary',
                  },
                  name: {
                    type: 'string',
                    example: 'user test',
                  },
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {},
            },
          },
        },
      },
    },
    '/api/v1/products': {
      get: {
        tags: ['Products'],
        summary: 'Get All Product',
        parameters: [
          { name: 'category', in: 'query', schema: { type: 'string' } },
          { name: 'name', in: 'query', schema: { type: 'string' } },
          { name: 'price', in: 'query', schema: { type: 'integer' } },
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {},
            },
          },
        },
      },
      post: {
        tags: ['Products'],
        summary: 'Create Product',
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    example: 'iphone',
                  },
                  description: {
                    type: 'string',
                    example: 'test product',
                  },
                  sku: {
                    type: 'string',
                    example: 'pro-apple',
                  },
                  category: {
                    type: 'string',
                    example: 'apple',
                  },
                  price: {
                    type: 'integer',
                    example: '1000',
                  },
                  image: {
                    type: 'string',
                    format: 'binary',
                  },
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {},
            },
          },
        },
      },
    },
    '/api/v1/products/{id}': {
      get: {
        tags: ['Products'],
        summary: 'Get Product',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'string',
            minimum: 1,
            description: 'The product ID.',
          },
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {},
            },
          },
        },
      },
      patch: {
        tags: ['Products'],
        summary: 'Update Product',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'string',
            minimum: 1,
            description: 'The product ID.',
          },
        ],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  image: {
                    type: 'string',
                    format: 'binary',
                  },
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {},
            },
          },
        },
      },
      delete: {
        tags: ['Products'],
        summary: 'Delete Product',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {},
            },
          },
        },
      },
    },
  },
};
