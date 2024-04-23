import { version } from '../../../package.json';

export default {
  openapi: '3.0.0',
  info: {
    version,
    title: 'Ecommerce',
    description: 'Ecommerce API',
    contact: {
      name: 'Aman Khadka',
      email: 'amankhadka101@gmail.com'
    }
  },
  security: [
    {
      ApiKeyAuth: []
    }
  ]
};
