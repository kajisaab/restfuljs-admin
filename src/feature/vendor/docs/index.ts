import schemas from './schemas';
import vendorOnboarding from './vendorOnoboarding';
import vendorList from './vendorTableList';

export default {
  schemas,
  paths: {
    '/vendor/onboard': { ...vendorOnboarding },
    '/vendor/list': { ...vendorList }
  }
};
