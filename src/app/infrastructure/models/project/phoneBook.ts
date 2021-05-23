export interface PhoneBookModel {
    isChecked?: boolean;
    id: number;
    phoneNumber: string;
    phoneName: string;
    userId: number; //who is adding number
    typePhoneNumberId: number; // (personal,official)
    statusAdminId: number; //who is approved or rejected number
    statusNumberId: number; //(rejected,approved.inprogress,sent)
}
