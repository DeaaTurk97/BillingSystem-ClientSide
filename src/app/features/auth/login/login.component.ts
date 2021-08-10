import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { TokenService } from '@app/infrastructure/core/services/token.service';
import { AuthService } from '@core/services/auth/auth.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public isInProgress: boolean = false;
    public isHidePassword: boolean = true;
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private notify: NotificationService,
        private tokenService: TokenService,
    ) {}

    ngOnInit(): void {
        localStorage.clear();
        this.ngInitialControlForm();
    }

    ngInitialControlForm() {
        this.loginForm = this.formBuilder.group({
            PhoneNumber: [null, Validators.required],
            Password: [null, Validators.compose([Validators.required])],
        });
    }

    logIn() {
        this.isInProgress = true;
        this.authService.login(this.loginForm.value).subscribe(
            (next) => {
                this.tokenService
                    .isSuperAdmin()
                    .pipe(
                        map((isSupperAdmin) => {
                            if (isSupperAdmin) {
                                this.router.navigateByUrl('bills/upload-bills');
                            } else {
                                this.router.navigateByUrl(
                                    'bills/billsSummary-list',
                                );
                            }
                        }),
                    )
                    .subscribe(() => {});
            },
            (error) => {
                this.isInProgress = false;
                this.notify.showTranslateMessage('InvalidPhoneNumberMessge');
            },
            () => {
                this.loginForm.reset();
                this.isInProgress = false;
            },
        );
    }

    registerRedirect() {
        this.router.navigateByUrl('/auth/register');
    }
}
