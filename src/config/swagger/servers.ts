import config from '..';

export default {
  servers: [
    {
      url: `http://localhost:${config.port}/v1/api/`,
      description: 'Local server'
    },
    {
      url: `http://172.16.16.53:${config.port}/v1/api/`,
      description: 'Machine server'
    },
    {
      url: `http://169.254.67.41:${config.port}/v1/api/`,
      description: 'Machine server without internet'
    },
    {
      url: `http://192.168.43.90:${config.port}/v1/api/`,
      description: 'Hotspot connection'
    }
  ]
};
