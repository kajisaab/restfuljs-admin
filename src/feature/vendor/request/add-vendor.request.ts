import { OwnerDetails } from '../dto/ownerDetails.dto';
import { VendorDetails } from '../dto/vendorDetails.dto';

export interface AddVendorValidationSchema {
  vendor: VendorDetails;
  owner: OwnerDetails;
}
