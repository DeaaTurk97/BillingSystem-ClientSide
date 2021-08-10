import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/infrastructure/core/services/auth/auth.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { Constants } from '@app/infrastructure/utils/constants';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit {
    frmResetPassword: FormGroup;
    public isHidePassword: boolean = true;
    public isHidePasswordConfirm: boolean = true;
    public passwordPattern: RegExp = Constants.patterns.DIGIT_REGEX;
    public tokenUrl: string = '';
    public email: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private router: Router,
        private notify: NotificationService,
    ) {}

    ngOnInit(): void {
        this.tokenUrl = String(
            this.activatedRoute.snapshot.paramMap.get('token'),
        );
        this.email = String(this.activatedRoute.snapshot.paramMap.get('email'));

        this.ngInitialControlForm();
    }

    ngInitialControlForm() {
        this.frmResetPassword = this.formBuilder.group({
            Email: [this.email],
            PasswordHash: [null, Validators.required],
            ConfirmPassword: [null, Validators.required],
            Token: [this.tokenUrl],
        });
    }

    onSubmit() {
        this.authService
            .resetPassword(this.frmResetPassword.value)
            .pipe(
                tap((data) => {
                    if (data) {
                        this.notify.showTranslateMessage(
                            'ResetPasswordSuccessfully',
                        );
                        this.router.navigateByUrl('auth/login');
                    } else {
                        this.notify.showTranslateMessage('ResetPasswordFailed');
                    }
                }),
            )
            .subscribe((result) => {});
    }

    ResetControls() {
        this.frmResetPassword.reset();
    }
}
