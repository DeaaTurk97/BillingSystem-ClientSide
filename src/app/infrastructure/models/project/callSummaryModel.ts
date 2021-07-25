export interface CallSummaryModel {
    id: number;
    userId: number;
    phoneNumber: string;
    userName: string;
    userEmail: string;
    groupName: string;
    freeSum: number;
    officialSum: number;
    personalSum: number;
    unknownSum: number;
}
