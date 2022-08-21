import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@app/infrastructure/core/services/auth/user.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { MustMatch } from '@app/infrastructure/shared/helpers/must-match.validator';
import { Constants } from '@app/infrastructure/utils/constants';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent implements OnInit {
    frmChangePassword: FormGroup;
    public isHideOldPassword: boolean = true;
    public isHideNewPassword: boolean = true;
    public isHidePasswordConfirm: boolean = true;
    public passwordPattern: RegExp = Constants.patterns.PASSWORD_REGEX;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private notify: NotificationService,
    ) {}

    get OldPassword() {
        return this.frmChangePassword.controls.OldPassword.value;
    }

    get NewPassword() {
        return this.frmChangePassword.controls.NewPassword.value;
    }

    ngOnInit(): void {
        this.ngInitialControlForm();
    }

    ngInitialControlForm() {
        this.frmChangePassword = this.formBuilder.group(
            {
                OldPassword: [null],
                NewPassword: [null, Validators.required],
                ComfirmPassword: [null, Validators.required],
            },
            { validator: MustMatch('NewPassword', 'ComfirmPassword') },
        );
    }

    changePassword() {
        this.userService
            .changePassword(this.OldPassword, this.NewPassword)
            .pipe(
                map((changedPassword) => {
                    if (changedPassword) {
                        this.notify.showTranslateMessage(
                            'PasswordChangedSuccessfully',
                            false,
                        );
                    } else {
                        this.notify.showTranslateMessage(
                            'PasswordChangedNotSuccessfully',
                        );
                    }
                }),
            )
            .subscribe((result) => {});
    }
}
