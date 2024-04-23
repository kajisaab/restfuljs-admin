import config from '..';

export default {
  servers: [
    {
      url: `http://192.168.1.66:${config.port}/v1/api/`,
      description: 'Local server'
    },
    {
      url: `http://172.16.16.53:${config.port}/v1/api/`,
      description: 'Machine server'
    }
  ]
};
