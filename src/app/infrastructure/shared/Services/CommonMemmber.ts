export enum State {
    Non,
    View,
    Add,
    Edit,
    Delete,
    Search,
    Print,
    PrintAll,
    Excel,
    ExcelAll,
    Pagination,
    Chatting,
    Check,
    BillDetails,
    Pay,
}

export enum ResultActions {
    Non,
    Added,
    Updated,
    Deleted,
    CancelAdd,
    AlreadyExist,
}

export interface ActionRowGrid {
    type: State;
    row: any;
}

export interface SystemNotification {
    Id: Number;
    CreatedBy: Number;
    RecipientId: Number;
    SenderId: Number;
    MessageText: string;
    ReferanceMassageId: Number;
}

export enum MonthsNames {
    January = 1,
    February = 2,
    March = 3,
    April = 4,
    May = 5,
    June = 6,
    July = 7,
    August = 8,
    September = 9,
    October = 10,
    November = 11,
    December = 12,
}
