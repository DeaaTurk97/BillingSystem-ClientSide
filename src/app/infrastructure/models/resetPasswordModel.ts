export interface ResetPasswordModel {
    Email: string;
    UserToken: string;
    PasswordHash: string;
    ConfirmPassword: string;
}
