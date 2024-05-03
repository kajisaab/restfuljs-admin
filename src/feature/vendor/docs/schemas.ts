export default {
  vendorSchema: {
    type: 'object',
    properties: {
      onboardingVendorRequest: {
        type: 'object',
        properties: {
          vendor: {
            type: 'object',
            required: ['businessName', 'country', 'province', 'state', 'street', 'wardNo', 'image', 'vendorType', 'accountHolderName', 'accountNumber', 'bankName'],
            properties: {
              businessName: {
                type: 'string',
                description: 'Registered Business Name',
                example: 'Auto Rental Chitwan'
              },
              country: {
                type: 'string',
                description: 'Country Name',
                example: 'Nepal'
              },
              province: {
                type: 'string',
                description: 'Province where business is registered',
                example: 'Bagmati'
              },
              state: {
                type: 'string',
                description: 'State where the business is registered',
                example: 'Chitwan'
              },
              street: {
                type: 'string',
                description: 'Street Name where the business is located',
                example: 'Jana Marga'
              },
              wardNo: {
                type: 'string',
                description: 'On which ward is business registered',
                example: '10'
              },
              municipality: {
                type: 'string',
                description: 'On which municipality is business registered',
                example: 'Ratnanagar'
              },
              ruralMunicipality: {
                type: 'string',
                description: 'On which rural municipality is business registered',
                example: ''
              },
              image: {
                type: 'string',
                description: 'path of image of the business',
                example: '1233-123123-12kljk123'
              },
              contactNo: {
                type: 'string',
                description: 'Vendor Contact Detail',
                example: '9845811111'
              },
              email: {
                type: 'string',
                description: 'Vendor Email Address',
                example: 'abc@gmail.com'
              },
              vendorType: {
                type: 'string',
                description: 'Vendor Type as SERVICE_PROVIDER | PRODUCT_SELLER | PRODUCT_SERVICE_PROVIDER',
                example: 'SERVICE_PROVIDER'
              },
              zipCode: {
                type: 'string',
                description: 'Zip Code of the Business Location',
                example: '12323'
              },
              facebookUrl: {
                type: 'string',
                description: 'Facebook Page Url',
                example: 'https//www.facebook.com/amankajikhadka'
              },
              instagramUrl: {
                type: 'string',
                description: 'Instagram Page Url',
                example: 'https//www.instagram.com/amankhadka'
              },
              twitterUrl: {
                type: 'string',
                description: 'Twitter Page Url',
                example: 'https://www.twitter.com/amankhadka'
              },
              accountHolderName: {
                type: 'string',
                description: 'Bank Account Holder Name',
                example: 'Aman Khadka'
              },
              accountNumber: {
                type: 'string',
                description: 'Bank Account Number',
                example: '12312213123123123'
              },
              bankName: {
                type: 'string',
                description: 'Bank Name',
                example: 'Himalayan Bank LTD.'
              }
            }
          },
          owner: {
            type: 'object',
            required: ['firstName', 'lastName', 'contactNumber', 'email', 'country', 'province', 'state'],
            properties: {
              firstName: {
                type: 'string',
                description: 'Owner First Name',
                example: 'Aman'
              },
              lastName: {
                type: 'string',
                description: 'Owner Last Name',
                example: 'Khadka'
              },
              userName: {
                type: 'string',
                description: 'Owner User Name',
                example: 'kaji__saab'
              },
              contactNo: {
                type: 'string',
                description: 'Owner Contact Number',
                example: '9845811111'
              },
              country: {
                type: 'string',
                description: 'User Country',
                example: 'Nepal'
              },
              province: {
                type: 'string',
                description: 'Owner Province',
                example: 'Bagmati'
              },
              state: {
                type: 'string',
                description: 'Owner State',
                example: 'Chitwan'
              },
              municipality: {
                type: 'string',
                description: 'Owner Municipality',
                example: 'Ratnanagar'
              },
              ruralMunicipality: {
                type: 'string',
                description: 'Owner Rural Municipality',
                example: ''
              },
              wardNo: {
                type: 'string',
                description: 'Owner Ward Number',
                example: '12'
              },
              street: {
                type: 'string',
                description: 'Owner Street',
                example: 'Janamarga'
              },
              zipCode: {
                type: 'string',
                description: 'Owner Address ZipCode',
                example: '12312'
              },
              image: {
                type: 'string',
                description: 'path of image of the owner',
                example: '1233-123123-12kljk123'
              }
            }
          }
        }
      },
      onboardingVendorResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'message',
            example: 'Successfully Onboarded Vendor'
          }
        }
      },
      vendorTableListResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '1231-123123-123-13123123'
          },
          businessName: {
            type: 'string',
            example: 'Auto Rental Chitwan'
          },
          country: {
            type: 'string',
            example: 'Nepal'
          },
          province: {
            type: 'string',
            example: 'Bagmati'
          },
          state: {
            type: 'string',
            example: 'Chitwan'
          },
          status: {
            type: 'string',
            example: 'Pending'
          },
          municipality: {
            type: 'string',
            example: 'Ratnanagar'
          },
          ruralMunicipality: {
            type: 'string',
            example: ''
          },
          image: {
            type: 'string',
            example: '1233-123123-12kljk123'
          },
          contactNo: {
            type: 'string',
            example: '9845811111'
          },
          email: {
            type: 'string',
            example: 'abc@gmail.com'
          },
          vendorType: {
            type: 'string',
            example: 'Service Provider'
          }
        }
      },
      vendorTableListRequest: {
        type: 'object',
        properties: {
          filters: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                vendorStatus: {
                  type: 'string',
                  description: 'define the vendor status as active pending or deactivate',
                  example: 'ALL'
                }
              }
            }
          },
          searchText: {
            type: 'string',
            description: 'Search text',
            example: ''
          }
        }
      },
      vendorDetailResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '12312-123123-12321-123123'
          },
          businessName: {
            type: 'string',
            description: 'Registered Business Name',
            example: 'Auto Rental Chitwan'
          },
          country: {
            type: 'string',
            description: 'Country Name',
            example: 'Nepal'
          },
          province: {
            type: 'string',
            description: 'Province where business is registered',
            example: 'Bagmati'
          },
          state: {
            type: 'string',
            description: 'State where the business is registered',
            example: 'Chitwan'
          },
          street: {
            type: 'string',
            description: 'Street Name where the business is located',
            example: 'Jana Marga'
          },
          wardNo: {
            type: 'string',
            description: 'On which ward is business registered',
            example: '10'
          },
          municipality: {
            type: 'string',
            description: 'On which municipality is business registered',
            example: 'Ratnanagar'
          },
          ruralMunicipality: {
            type: 'string',
            description: 'On which rural municipality is business registered',
            example: ''
          },
          image: {
            type: 'string',
            description: 'path of image of the business',
            example: '1233-123123-12kljk123'
          },
          contactNo: {
            type: 'string',
            description: 'Vendor Contact Detail',
            example: '9845811111'
          },
          email: {
            type: 'string',
            description: 'Vendor Email Address',
            example: 'abc@gmail.com'
          },
          vendorType: {
            type: 'string',
            description: 'Vendor Type as SERVICE_PROVIDER | PRODUCT_SELLER | PRODUCT_SERVICE_PROVIDER',
            example: 'SERVICE_PROVIDER'
          },
          zipCode: {
            type: 'string',
            description: 'Zip Code of the Business Location',
            example: '12323'
          },
          facebookUrl: {
            type: 'string',
            description: 'Facebook Page Url',
            example: 'https//www.facebook.com/amankajikhadka'
          },
          instagramUrl: {
            type: 'string',
            description: 'Instagram Page Url',
            example: 'https//www.instagram.com/amankhadka'
          },
          twitterUrl: {
            type: 'string',
            description: 'Twitter Page Url',
            example: 'https://www.twitter.com/amankhadka'
          },
          accountHolderName: {
            type: 'string',
            description: 'Bank Account Holder Name',
            example: 'Aman Khadka'
          },
          accountNumber: {
            type: 'string',
            description: 'Bank Account Number',
            example: '12312213123123123'
          },
          bankName: {
            type: 'string',
            description: 'Bank Name',
            example: 'Himalayan Bank LTD.'
          }
        }
      }
    }
  }
};
