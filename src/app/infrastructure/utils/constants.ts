export interface IPattern {
    DIGIT_REGEX: RegExp;
    EMAIL_REGEX: RegExp;
    SYMBOL_REGEX: RegExp;
    PASSWORD_REGEX: RegExp;
}

export interface IConstant {
    DefaultLanguageDirection: string;
    DefaultLanguageId: number;
    patterns: IPattern;
    MAXFILESIZE: number;
    MAXFILENAMELENGTH: number;
    Default_Image_Setting_Name: string;
    TypePhoneNumberId: string;
    DefaultPassword: string;
    ValueOfAllowedCallsToTheEmployee: string;
    TheNumberOfDaysGrantedToTheEmployeeToSendTheBill: string;
    FractionNumbers: string;
    IsDefaultPassword: string;
    IsSendPasswordByEmail: string;
    IsViewCallsThatHaveApriceEqualZero: string;
    IsAbilityOfTheAdministratorToControlEmployeeBills: string;
    IsReminderByEmail: string;
    IsReminderBySystem: string;
    SMTPServer: string;
    SMTPUserEmail: string;
    SMTPUserPassword: string;
    SMTPPortNo: string;
    IsUseSSL: string;
    IsRequiresAuthentication: string;
    EmailForTest: string;
    ImportCC: string;
    ImportSubject: string;
    ImportBody: string;
    ReminderIdentifyNewNumbersCC: string;
    ReminderIdentifyNewNumbersSubject: string;
    ReminderIdentifyNewNumbersBody: string;
    RejectionNumberCC: string;
    RejectionNumberSubject: string;
    RejectionNumberBody: string;
    PaidCC: string;
    PaidSubject: string;
    PaidBody: string;
    UnPaidCC: string;
    UnPaidSubject: string;
    UnPaidBody: string;
    SubmittedCC: string;
    SubmittedSubject: string;
    SubmittedBody: string;
    ReminderTotalDueCC: string;
    ReminderTotalDueSubject: string;
    ReminderTotalDueBody: string;
    ReminderStartPeriodSubmittBillCC: string;
    ReminderStartPeriodSubmittBillSubject: string;
    ReminderStartPeriodSubmittBillBody: string;
    ReminderEndPeriodSubmittBillCC: string;
    ReminderEndPeriodSubmittBillSubject: string;
    ReminderEndPeriodSubmittBillBody: string;
    EmailTestCC: string;
    EmailTestSubject: string;
    EmailTestBody: string;
    DisplayNameEmail: string;
    IsDeleteFreeTypeNumber: string;
    IsAutomatedApprovalBills: string;
    IsAutomatedApprovalServices: string;
    IsAutomatedApprovalPhoneNumbers: string;
    IsJoinEmployeesWithLimitValue: string;
    TaxAmount: string;
}

export const Constants: IConstant = {
    patterns: {
        DIGIT_REGEX: /[0-9]{9}/,
        EMAIL_REGEX: /^[a-z0-9!#$%&'*+\/=?^_\`{|}~.-]+@[a-z0-9]([a-z0-9-])+(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
        SYMBOL_REGEX: /[-+_!@#$%^&*,.?]/,
        PASSWORD_REGEX: /(?=.*\d)(?=.*[a-z]).{8}/,
    },
    // 10MB
    MAXFILESIZE: 1000000e6,
    MAXFILENAMELENGTH: 100,
    Default_Image_Setting_Name: 'default_image',
    DefaultLanguageId: 2,
    DefaultLanguageDirection: 'ltr',
    TypePhoneNumberId: 'TypePhoneNumberId',
    DefaultPassword: 'DefaultPassword',
    ValueOfAllowedCallsToTheEmployee: 'ValueOfAllowedCallsToTheEmployee',
    TheNumberOfDaysGrantedToTheEmployeeToSendTheBill:
        'TheNumberOfDaysGrantedToTheEmployeeToSendTheBill',
    FractionNumbers: 'FractionNumbers',
    IsDefaultPassword: 'IsDefaultPassword',
    IsSendPasswordByEmail: 'IsSendPasswordByEmail',
    IsViewCallsThatHaveApriceEqualZero: 'IsViewCallsThatHaveApriceEqualZero',
    IsAbilityOfTheAdministratorToControlEmployeeBills:
        'IsAbilityOfTheAdministratorToControlEmployeeBills',
    IsReminderByEmail: 'IsReminderByEmail',
    IsReminderBySystem: 'IsReminderBySystem',
    SMTPServer: 'SMTPServer',
    SMTPUserEmail: 'SMTPUserEmail',
    SMTPUserPassword: 'SMTPUserPassword',
    SMTPPortNo: 'SMTPPortNo',
    IsUseSSL: 'IsUseSSL',
    IsRequiresAuthentication: 'IsRequiresAuthentication',
    EmailForTest: 'EmailForTest',
    ImportCC: 'ImportCC',
    ImportSubject: 'ImportSubject',
    ImportBody: 'ImportBody',
    ReminderIdentifyNewNumbersCC: 'ReminderIdentifyNewNumbersCC',
    ReminderIdentifyNewNumbersSubject: 'ReminderIdentifyNewNumbersSubject',
    ReminderIdentifyNewNumbersBody: 'ReminderIdentifyNewNumbersBody',
    RejectionNumberCC: 'RejectionNumberCC',
    RejectionNumberSubject: 'RejectionNumberSubject',
    RejectionNumberBody: 'RejectionNumberBody',
    PaidCC: 'PaidCC',
    PaidSubject: 'PaidSubject',
    PaidBody: 'PaidBody',
    UnPaidCC: 'UnPaidCC',
    UnPaidSubject: 'UnPaidSubject',
    UnPaidBody: 'UnPaidBody',
    SubmittedCC: 'SubmittedCC',
    SubmittedSubject: 'SubmittedSubject',
    SubmittedBody: 'SubmittedBody',
    ReminderTotalDueCC: 'ReminderTotalDueCC',
    ReminderTotalDueSubject: 'ReminderTotalDueSubject',
    ReminderTotalDueBody: 'ReminderTotalDueBody',
    ReminderStartPeriodSubmittBillCC: 'ReminderStartPeriodSubmittBillCC',
    ReminderStartPeriodSubmittBillSubject:
        'ReminderStartPeriodSubmittBillSubject',
    ReminderStartPeriodSubmittBillBody: 'ReminderStartPeriodSubmittBillBody',
    ReminderEndPeriodSubmittBillCC: 'ReminderEndPeriodSubmittBillCC',
    ReminderEndPeriodSubmittBillSubject: 'ReminderEndPeriodSubmittBillSubject',
    ReminderEndPeriodSubmittBillBody: 'ReminderEndPeriodSubmittBillBody',
    EmailTestCC: 'EmailTestCC',
    EmailTestSubject: 'EmailTestSubject',
    EmailTestBody: 'EmailTestBody',
    DisplayNameEmail: 'DisplayNameEmail',
    IsDeleteFreeTypeNumber: 'IsDeleteFreeTypeNumber',
    TaxAmount: '0',
    IsAutomatedApprovalBills: 'IsAutomatedApprovalBills',
    IsAutomatedApprovalServices: 'IsAutomatedApprovalServices',
    IsAutomatedApprovalPhoneNumbers: 'IsAutomatedApprovalPhoneNumbers',
    IsJoinEmployeesWithLimitValue: 'IsJoinEmployeesWithLimitValue',
};
