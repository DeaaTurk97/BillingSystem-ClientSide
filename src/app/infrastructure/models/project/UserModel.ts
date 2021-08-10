export interface UserModel {
    userId: number;
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
}
