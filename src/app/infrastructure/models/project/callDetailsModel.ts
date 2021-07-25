export interface CallDetailsModel {
    id: number;
    userId: number;
    userName: string;
    phoneNumber: string;
    groupId: number;
    groupName: string;
    dialledNumber: string;
    callDateTime: Date;
    callDuration: string;
    callRetailPrice: number;
    callDiscountPrice: number;
    typePhoneNumberId: number;
    serviceTypeId: number;
    serviceTypeName: string;
}
