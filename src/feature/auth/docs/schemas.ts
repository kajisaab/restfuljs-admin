export default {
  authenticationSchema: {
    type: 'object',
    properties: {
      loginUserDetailRepsonse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'id',
            example: '92bd78f6-da3d-42c2-8b98-ddc6d7334b1b'
          },
          email: {
            type: 'string',
            description: 'email',
            example: 'amankhadka101@gmail.com'
          },
          fullName: {
            type: 'string',
            description: 'fullName',
            example: 'Aman Khadka'
          },
          phoneNumber: {
            type: 'string',
            description: 'phoneNumber',
            example: '9841234567'
          },
          role: {
            type: 'string',
            description: 'role',
            example: 'customer'
          },
          userName: {
            type: 'string',
            description: 'userName',
            example: 'kaji_saab'
          },
          userType: {
            type: 'string',
            description: 'userType',
            example: 'customer'
          },
          accessToken: {
            type: 'string',
            description: 'accessToken',
            example:
              'alsdjflsjfslkfjsldkfjsldfjlsakdfjklsdjfklasjfklasjflajslfjiruwpiurwoieruwoiruowiueruoiwcniwuoisjdfsfsakfjlaskfjlaksfja'
          },
          refreshToken: {
            type: 'string',
            description: 'refreshToken',
            example:
              'alsdjflsjfslkfjsldkfjsldfjlsakdfjklsdjfklasjfklasjflajslfjiruwpiurwoieruwoiruowiueruoiwcniwuoisjdfsfsakfjlaskfjlaksfja'
          }
        }
      },
      signupUserDetailRequest: {
        type: 'object',
        required: [
          'email',
          'firstName',
          'lastName',
          'password',
          'userName',
          'phoneNumber'
        ],
        properties: {
          email: {
            type: 'string',
            description: 'email',
            example: 'amankhadka101@gmail.com'
          },
          password: {
            type: 'string',
            description: 'password',
            example: 'Test@123'
          },
          firstName: {
            type: 'string',
            description: 'firstName',
            example: 'Aman'
          },
          lastName: {
            type: 'string',
            description: 'lastName',
            example: 'Khadka'
          },
          userName: {
            type: 'string',
            description: 'userName',
            example: 'kaji_saab'
          },
          phoneNumber: {
            type: 'string',
            description: 'phoneNumber',
            example: '1234567890'
          }
        }
      },
      signupUserDetailsResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'message',
            example: 'Successfully created user'
          }
        }
      }
    }
  }
};
