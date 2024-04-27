export default {
  post: {
    tags: ['Vendor'],
    summary: 'Onboard vendor',
    description: 'Onboard vendor',
    operationId: 'vendorOnboarding',
    security: [
      {
        'X-XSRF-TOKEN': []
      }
    ],
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/vendorSchema/properties/onboardingVendorRequest'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Vendor Onboarded ',
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
                  type: 'object',
                  $ref: '#/components/schemas/vendorSchema/properties/onboardingVendorResponse'
                }
              }
            }
          }
        }
      }
    }
  }
};
