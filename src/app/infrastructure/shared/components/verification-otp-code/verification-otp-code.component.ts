import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirmDialogConfig } from '@app/infrastructure/models/dialog';
import { VerificationCodeModel } from '@app/infrastructure/models/verificationCode';

@Component({
    selector: 'app-verification-otp-code',
    templateUrl: './verification-otp-code.component.html',
    styleUrls: ['./verification-otp-code.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerificationOtpCodeComponent {
    public FirstNumber: string = '';
    public SecondNumbre: string = '';
    public ThirdNumber: string = '';
    public FourthNumber: string = '';
    public verifyOtpModel: VerificationCodeModel = {
        email: '',
        verificationCode: '',
        phoneNumber: '',
    };

    message: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public dialog: IConfirmDialogConfig,
        private dialogRef: MatDialogRef<VerificationOtpCodeComponent>,
    ) {}

    public submit(): void {
        this.verifyOtpModel.email = this.dialog.email;
        this.verifyOtpModel.verificationCode = `${this.FirstNumber}${this.SecondNumbre}${this.ThirdNumber}${this.FourthNumber}`;
        this.verifyOtpModel.phoneNumber = '';

        this.dialogRef.close(this.verifyOtpModel);
    }
}
