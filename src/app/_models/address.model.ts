export interface AddressModel {
  AddressId?: string;
  UserId?: string;
  AddressType: string;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3?: string;
  City: string;
  Province?: string;
  PostalCode?: string;
  CreateDate?: string;
  CrateUserId?: string;
  ModifyDate?: string;
  ModifyUserId?: string;
  StatusId?: string;
}

export interface AddressQueryModel {
  UserId?: string;
}
