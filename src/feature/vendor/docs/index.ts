import schemas from './schemas';
import vendorOnboarding from './vendorOnoboarding';
import vendorList from './vendorTableList';
import vendorDetails from './getVendorDetail';

export default {
  schemas,
  paths: {
    '/vendor/onboard': { ...vendorOnboarding },
    '/vendor/list': { ...vendorList },
    '/vendor/{id}': { ...vendorDetails }
  }
};
