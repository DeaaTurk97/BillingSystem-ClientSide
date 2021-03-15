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
