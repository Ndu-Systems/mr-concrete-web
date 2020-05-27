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
  Token?: string;
  Role: RoleModel;
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
