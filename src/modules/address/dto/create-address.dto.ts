export interface CreateAddressDto {
  fullName: string;
  companyName?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  isDefault: boolean;
  addressName: 'work' | 'home' | 'other';
  shipToDifferentAddress: boolean;
  orderNote?: string;
}
