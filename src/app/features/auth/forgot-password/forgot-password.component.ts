import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@app/infrastructure/core/services/auth/auth.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { VerificationCodeModel } from '@app/infrastructure/models/verificationCode';
import { VerificationOtpCodeComponent } from '@app/infrastructure/shared/components/verification-otp-code/verification-otp-code.component';
import { of } from 'rxjs/internal/observable/of';
import { map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit {
    footerIcon = '../../../../assets/images/icon/Group.svg';
    loginIcon = '../../../../assets/images/icon/bills-icon.svg';
    mukalamatIcon = '../../../../assets/images/icon/mukalamat.svg';
    PhoneBillingSystemIcon =
        '../../../../assets/images/icon/PhoneBillingSystem.svg';
    public frmForgotPassword: FormGroup;
    public isInProgress: boolean = false;
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private dialog: MatDialog,
        private router: Router,
        private notify: NotificationService,
    ) {}

    get UserEmail() {
        return this.frmForgotPassword.controls['email'].value;
    }

    ngOnInit(): void {
        localStorage.clear();
        this.ngInitialControlForm();
    }

    ngInitialControlForm(): void {
        this.frmForgotPassword = this.formBuilder.group({
            email: [
                null,
                Validators.compose([Validators.required, Validators.email]),
            ],
        });
    }

    reset() {
        this.isInProgress = true;
        this.authService
            .forgotPassword(this.frmForgotPassword.controls['email'].value)
            .pipe(
                map((otpSent) => {
                    return otpSent;
                }),
            )
            .subscribe((result) => {
                if (result) {
                    this.verifyEmailOtp();
                }
            });
    }

    verifyEmailOtp() {
        const dialog = this.dialog.open(VerificationOtpCodeComponent, {
            width: '60em',
            height: '16em',
            panelClass: 'confirm-dialog-container',
            position: { top: '5em' },
            disableClose: true,
            data: {
                messageList: ['VerifyEmailOtpCode'],
                action: 'VerificationCode',
                email: this.UserEmail,
                showCancel: true,
            },
        });

        return dialog
            .afterClosed()
            .pipe(
                switchMap((dialogResult: VerificationCodeModel) => {
                    if (dialogResult.email && dialogResult.verificationCode) {
                        return this.authService
                            .verifyEmailCode(dialogResult)
                            .pipe(
                                map((VerificationCodeResponse) => {
                                    if (
                                        VerificationCodeResponse.isVerifiedOtp
                                    ) {
                                        this.router.navigate(
                                            ['auth/reset-password'],
                                            {
                                                state: {
                                                    email:
                                                        VerificationCodeResponse.email,
                                                    tokenCode:
                                                        VerificationCodeResponse.tokenCode,
                                                },
                                            },
                                        );
                                    }
                                }),
                            );
                    } else {
                        this.router.navigateByUrl('auth/login');
                        return of(null);
                    }
                }),
            )
            .subscribe((result) => {});
    }
}
