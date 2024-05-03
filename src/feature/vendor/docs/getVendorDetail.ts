export default {
  get: {
    tags: ['Vendor'],
    summary: 'Get details of vendor',
    description: 'Get details of vendor',
    operationId: 'VendorDetail',
    security: [
      {
        'X-XSRF-TOKEN': []
      }
    ],
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'Vendor Id',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
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
                  $ref: '#/components/schemas/vendorSchema/properties/vendorDetailResponse'
                }
              }
            }
          }
        }
      }
    }
  }
};
