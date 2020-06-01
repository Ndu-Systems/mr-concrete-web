import { AddressModel } from './address.model';
import { CompanyModel } from './Company.model';

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


