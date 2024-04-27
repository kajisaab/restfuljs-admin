import schemas from './schemas';
import vendorOnboarding from './vendorOnoboarding';

export default {
  schemas,
  paths: {
    '/vendor/onboard': { ...vendorOnboarding }
  }
};
