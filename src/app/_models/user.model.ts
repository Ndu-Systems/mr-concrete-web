import { AddressModel } from './address.model';
import { CompanyModel } from './Company.model';
import { Image } from './image.model';

export class UserModel {
  UserId: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Password?: string;
  Cellphone: string;
  RoleId: string;
  CreateDate: string;
  CreateUserId: string;
  ModifyDate: string;
  ModifyUserId: string;
  StatusId: string;
  CompanyId?: string;
  Token?: string;
  Roles: RoleModel;
  Company: CompanyModel;
  Address: AddressModel[];
  Images: Image[];
}
export class UserProfileUpdateModel {
  UserId: string;
  FirstName: string;
  LastName: string;
  Email: string;
  CompanyId?: string;
  Cellphone: string;
  RoleId: string;
  CreateDate: string;
  CreateUserId: string;
  ModifyDate: string;
  ModifyUserId: string;
  StatusId: string;

  // company details
  CompanyName: string;
  CompanyPhone: string;
  CompanyEmail: string;
  ParentId: string;
  CompanyType: string;
  Province?: string;
  CompanyAddress?: string;
  City?: string;
  PostalCode?: string;
  CompanyCreateDate?: string;
  CompanyIsDeleted?: boolean;
  CompanyStatusId?: string;
}

export class RoleModel {
  Id: string;
  RoleName: string;
  CreateDate: string;
  CreateUserId: string;
  ModifyDate: string;
  ModifyUserId: string;
  StatusId: string;

}
export class ChangePasswordModel {
  Email: string;
  Password?: string;
  ConfirmPassword?: string;
}

export class UserQueryModel {
  StatusId: string;
  TypeOfUser: string;
}

