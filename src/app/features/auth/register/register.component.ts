import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '@core/services/notification.service';
import { Constants } from '@app/infrastructure/utils/constants';
import { mergeMap, tap } from 'rxjs/operators';

const passwordPattern: string = '(?=.*d)(?=.*[a-z]).{8}';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    public isInProgress = false;
    public isHidePassword: boolean = true;
    public isHidePasswordConfirm: boolean = true;
    public passwordPattern: RegExp = Constants.patterns.PASSWORD_REGEX;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private notify: NotificationService,
    ) {}

    get Email() {
        return this.registerForm.controls.Email.value;
    }

    ngOnInit(): void {
        this.ngInitialControlForm();
    }
    ngInitialControlForm() {
        this.registerForm = this.formBuilder.group({
            UserName: [null, Validators.required],
            Email: [
                null,
                Validators.compose([Validators.required, Validators.email]),
            ],
            PhoneNumber: [null, Validators.required],
            PasswordHash: [null, Validators.required],
            ConfirmPassword: [null, Validators.required],
            LanguageId: [1, Validators.required],
        });
    }

    register() {
        this.isInProgress = true;
        void this.authService
            .IsUserExists(this.Email)
            .pipe(
                mergeMap((data) => {
                    if (!data) {
                        return this.authService.register(
                            this.registerForm.value,
                        );
                    } else {
                        this.notify.showTranslateMessage('EmailAlreadyExist');
                    }
                }),
                tap((data) => {
                    if (data) {
                        this.notify.showTranslateMessage(
                            'AddedSuccessfully',
                            false,
                        );
                    } else {
                        this.notify.showTranslateMessage(
                            'NotAddedSuccessfully',
                        );
                    }
                }),
            )
            .subscribe((result) => {
                this.isInProgress = false;
                this.registerForm.reset();
            });
    }

    ResetControls() {
        this.registerForm.reset();
    }

    loginRedirect() {
        this.ResetControls();
        this.router.navigateByUrl('/auth/login');
    }
}
