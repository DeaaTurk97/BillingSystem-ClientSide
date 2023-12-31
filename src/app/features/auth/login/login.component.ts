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
    footerIcon = '../../../../assets/images/icon/Group.svg';
    loginIcon = '../../../../assets/images/icon/bills-icon.svg';
    mukalamatIcon = '../../../../assets/images/icon/mukalamat.svg';
    PhoneBillingSystemIcon =
        '../../../../assets/images/icon/PhoneBillingSystem.svg';
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
                    .isFinance()
                    .pipe(
                        map((isFinance) => {
                            if (isFinance) {
                                this.router.navigateByUrl(
                                    'bills/comingBills-list',
                                );
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
                this.loginForm.reset();
                this.isInProgress = false;
            },
            () => {},
        );
    }

    registerRedirect() {
        this.router.navigateByUrl('/auth/register');
    }
}
