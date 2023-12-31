export class ReportFilterModel {
    billId: number;
    fromDate: string;
    toDate: string;
    userId: number;
    groupId: number;
    serviceTypeId: number;
    countryId: number;
    countryIdExclude: number;
    typePhoneNumberId: number;
    isSubmitted: boolean;
    reportType: string;
    pageSize: number;
    pageIndex: number;
}
