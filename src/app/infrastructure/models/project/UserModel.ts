export interface UserModel {
    id: number;
    userName: string;
    email: string;
    phoneNumber: string;
    passwordHash: string;
    confirmPassword: string;
    isActive: boolean;
    dateOfBirth: Date;
    roleId: number;
    groupId: number;
    roleName: string;
    languageId: number;
    simCardTypeId: number;
    simProfileId: number;
    planId: number;
    notes: string;
    fixedAmount: number;
}
