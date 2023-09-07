import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/infrastructure/core/services/auth/auth.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { ResetPasswordModel } from '@app/infrastructure/models/resetPasswordModel';
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
    footerIcon = '../../../../assets/images/icon/Group.svg';
    loginIcon = '../../../../assets/images/icon/bills-icon.svg';
    mukalamatIcon = '../../../../assets/images/icon/mukalamat.svg';
    PhoneBillingSystemIcon =
        '../../../../assets/images/icon/PhoneBillingSystem.svg';
    public isHidePassword: boolean = true;
    public isHidePasswordConfirm: boolean = true;
    public passwordPattern: RegExp = Constants.patterns.PASSWORD_REGEX;
    public tokenUrl: string = '';
    public email: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private notify: NotificationService,
    ) {
        this.email = this.router.getCurrentNavigation().extras.state.email;
        this.tokenUrl = this.router.getCurrentNavigation().extras.state.tokenCode;
    }

    ngOnInit(): void {
        this.ngInitialControlForm();
    }

    ngInitialControlForm() {
        this.frmResetPassword = this.formBuilder.group({
            Email: [this.email],
            Token: [this.tokenUrl],
            PasswordHash: [null, Validators.required],
            ConfirmPassword: [null, Validators.required],
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
