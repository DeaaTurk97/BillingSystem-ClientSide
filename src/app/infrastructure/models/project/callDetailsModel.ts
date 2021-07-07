export interface CallDetailsModel {
    id: number;
    userId: number;
    userName: string;
    phoneNumber: string;
    groupId: number;
    groupNameEn: string;
    groupNameAr: string;
    dialledNumber: string;
    callDateTime: Date;
    callDuration: string;
    callRetailPrice: number;
    callDiscountPrice: number;
    typePhoneNumberId: number;
    serviceTypeId: number;
    serviceNameAr: string;
    serviceNameEn: string;
}
