export interface CallSummaryModel {
    id: number;
    userId: number;
    phoneNumber: string;
    userName: string;
    userEmail: string;
    groupNameEn: string;
    groupNameAr: string;
    freeSum: number;
    officialSum: number;
    personalSum: number;
    unknownSum: number;
}
