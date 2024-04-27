/**
 * import the paths to be used here
 */
import auth from '@feature/auth/docs'; // import the auth paths
import vendor from '@feature/vendor/docs';
export default {
  paths: {
    ...auth.paths,
    ...vendor.paths
  }
};
