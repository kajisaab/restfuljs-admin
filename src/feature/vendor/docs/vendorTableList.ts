export default {
  post: {
    tags: ['Vendor'],
    summary: 'Get table list of vendor',
    description: 'Get table list of vendor',
    operationId: 'VendorList',
    security: [
      {
        'X-XSRF-TOKEN': []
      }
    ],
    parameters: [
      {
        name: 'page',
        in: 'query',
        description: 'Page number',
        required: false,
        schema: {
          type: 'integer',
          default: 1
        }
      },
      {
        name: 'pageSize',
        in: 'query',
        description: 'Page Size',
        required: false,
        schema: {
          type: 'integer',
          default: 10
        }
      }
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/vendorSchema/properties/vendorTableListRequest'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  example: '0'
                },
                message: {
                  type: 'string',
                  example: 'SUCCESS'
                },
                data: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/vendorSchema/properties/vendorTableListResponse'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
