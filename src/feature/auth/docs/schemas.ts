export default {
  authenticationSchema: {
    type: 'object',
    properties: {
      loginUserDetailRepsonse: {
        type: 'object',
        properties: {
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
            example: 'Vendor'
          },
          accessToken: {
            type: 'string',
            description: 'accessToken',
            example: 'alsdjflsjfslkfjsldkfjsldfjlsakdfjklsdjfklasjfklasjflajslfjiruwpiurwoieruwoiruowiueruoiwcniwuoisjdfsfsakfjlaskfjlaksfja'
          },
          refreshToken: {
            type: 'string',
            description: 'refreshToken',
            example: 'alsdjflsjfslkfjsldkfjsldfjlsakdfjklsdjfklasjfklasjflajslfjiruwpiurwoieruwoiruowiueruoiwcniwuoisjdfsfsakfjlaskfjlaksfja'
          }
        }
      },
      signupUserDetailRequest: {
        type: 'object',
        required: ['email', 'firstName', 'lastName', 'password', 'userName', 'phoneNumber'],
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
          },
          country: {
            type: 'string',
            description: 'User Residing Country',
            example: 'Nepal'
          },
          province: {
            type: 'string',
            description: 'User Residing province',
            example: 'Bagmati'
          },
          state: {
            type: 'string',
            description: 'User Residing state',
            example: 'Chitwan'
          },
          street: {
            type: 'string',
            description: 'User Street Name',
            example: 'Janamarga'
          },
          wardNo: {
            type: 'string',
            description: 'User ward Number',
            example: '01'
          },
          municipality: {
            type: 'string',
            description: 'User Municipality',
            example: 'Ratnanagar'
          },
          ruralMunicipality: {
            type: 'string',
            description: 'User Rural Municipality',
            example: ''
          },
          image: {
            type: 'string',
            description: 'User Image',
            example: '/aksdf/sdfsa/newImage.jpeg'
          },
          zipCode: {
            type: 'string',
            description: 'User location zip code',
            example: '123123'
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
