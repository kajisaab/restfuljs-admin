/* eslint-disable quotes */
/**
 * common definition schemas goes here.
 */
import Authentication from '@feature/auth/docs';
const commonDefinitions = {
  errorSchema: {
    type: 'object',
    properties: {
      notFoundError: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            example: '-1'
          },
          message: {
            type: 'string',
            example: 'Bad Request'
          },
          data: {
            type: 'string',
            message: 'BAD REQUEST'
          }
        }
      },
      internalServerError: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            example: '-1'
          },
          message: {
            type: 'string',
            example: 'Internal Server Error'
          },
          data: {
            type: 'string',
            message: 'Server error, please try again later'
          }
        }
      },
      forbiddenError: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            example: '-1'
          },
          message: {
            type: 'string',
            example: 'Access Denied'
          },
          data: {
            type: 'string',
            message: 'Access Denied'
          }
        }
      },
      UnauthorizedError: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            example: '-1'
          },
          message: {
            type: 'string',
            example: 'Unauthorized'
          },
          data: {
            type: 'string',
            example: 'Unauthorized'
          }
        }
      }
    }
  }
};

/**
 *
 * add schemas for request, response, error body as required here
 * for defining the schema it can be defined directly here (not recommended as this file could get cluttered),
 * or export an object from a module that will define a particular schema
 */
export default {
  components: {
    schemas: {
      ...commonDefinitions,
      ...Authentication.schemas
    },
    securitySchemes: {
      'X-XSRF-TOKEN': {
        type: 'apiKey',
        in: 'header',
        name: 'X-XSRF-TOKEN',
        description:
          "For accessing the API, a valid JWT token must be passed in the 'X-XSRF-TOKEN' header." +
          '\n\n' +
          "A valid JWT token is generated by the API and returned as the result of a call to the route '/auths/login', providing a valid email and password." +
          '\n\n' +
          'The token should be sent as plain text in the header.'
      }
    }
  }
};
