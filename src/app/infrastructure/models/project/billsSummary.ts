export class BillsSummaryModel {
    id: number;
    BillDate: Date;
    SubmittedByAdmin?: boolean;
    SubmittedByUser?: boolean;
    SubmittedDate?: Date;
}
