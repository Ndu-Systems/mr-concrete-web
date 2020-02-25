export interface Caterory {
    // CategoryId?: string;
    // CompanyId: string;
    // Name: string;
    // CreateDate?: string;
    // CreateUserId: string;
    // ModifyDate?: string;
    // ModifyUserId: string;
    // StatusId: number;

    CategoryId: string;
    CategoryName: string;
    CreateDate: string;
    CreateUserId: string;
    ModifyDate: string;
    ModifyUserId: string;
    StatusId: string;
}


export const initCaterory: Caterory = {
    CategoryId: '',
    CategoryName: '',
    CreateDate: '',
    CreateUserId: '',
    ModifyDate: '',
    ModifyUserId: '',
    StatusId: '',
}