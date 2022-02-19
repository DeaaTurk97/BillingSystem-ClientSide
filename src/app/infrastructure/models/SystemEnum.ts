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
    BillPaid = 100,
    Chatting = 110,
    ServicesSubmitted = 120,
    ServicesApproved = 130,
    ServicesInProgress = 140,
    ServicesRejected = 150,
    NewServiceAdded = 160,
    ServiceRemoved = 170,
    ServicePriceGraterThanServicePlan = 180,
}

export enum StatusCycleBills {
    Submit = 1,
    InprogressToApproved = 2,
    Approved = 3,
    Rejected = 4,
}
