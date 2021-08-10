import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/infrastructure/core/services/auth/auth.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit {
    public frmForgotPassword: FormGroup;
    public isInProgress: boolean = false;
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private notify: NotificationService,
    ) {}

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
            .subscribe(
                (next) => {
                    this.notify.showTranslateMessage('ResetPasswordSent');
                    this.router.navigateByUrl('auth/login');
                },
                (error) => {
                    this.isInProgress = false;
                    this.notify.showTranslateMessage('ResetPasswordFailed');
                },
                () => {
                    this.frmForgotPassword.reset();
                    this.isInProgress = false;
                },
            );
    }
}
