import { VendorListDto } from '../dto/get-vendor-list.dto';

export class GetVendorListResponse {
  constructor(public readonly list: VendorListDto[]) {}
}
