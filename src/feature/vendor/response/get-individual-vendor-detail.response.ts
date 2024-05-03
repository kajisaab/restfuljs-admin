import { VendorDetails } from '../dto/vendorDetails.dto';

export class GetIndividualVendorDetailResponse {
  constructor(public readonly data: VendorDetails) {}
}
