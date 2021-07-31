export enum NotificationType {
    PhoneNumbersSubmitted = 10,
    PhoneNumbersApproved = 20,
    PhoneNumbersIprogress = 30,
    PhoneNumbersRejected = 40,
    BillUploaded = 50,
    BillSubmitted = 60,
    BillApproved = 70,
    BillInProgress = 80,
    BillRejected = 90,
    Chatting = 100,
}

export enum StatusCycleBills {
    Submit = 1,
    InprogressToApproved = 2,
    Approved = 3,
    Rejected = 4,
}
