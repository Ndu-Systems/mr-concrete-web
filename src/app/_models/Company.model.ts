export class CompanyModel {
  CompanyId: string;
  CompanyName: string;
  CompanyPhone: string;
  CompanyEmail: string;
  ParentId?: string;
  CompanyType: string;
  Province?: string;
  CompanyAddress: string;
  City: string;
  PostalCode: string;
  CreateDate: string;
  CreateUserId: string;
  ModifyDate: string;
  ModifyUserId: string;
  IsDeleted: boolean;
  StatusId: string;
  SubBranches?: CompanyModel[];
}

export interface CompanyQueryModel {
  CompanyId?: string;
  UserId?: string;
  IsDeleted: boolean;
  StatusId: string;
}

export interface CompanyTypeModel {
  Type: string;
  DisplayName?: string;
  Description?: string;
}
