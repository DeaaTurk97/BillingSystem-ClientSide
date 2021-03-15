import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { AuthService } from '@core/services/auth/auth.service';

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
    ) {}

    ngOnInit(): void {
        localStorage.clear();
        this.ngInitialControlForm();
    }

    ngInitialControlForm() {
        this.loginForm = this.formBuilder.group({
            Email: [
                null,
                Validators.compose([Validators.required, Validators.email]),
            ],
            Password: [null, Validators.compose([Validators.required])],
        });
    }

    logIn() {
        this.isInProgress = true;
        this.authService.login(this.loginForm.value).subscribe(
            (next) => {
                this.router.navigateByUrl('landing/jobs-list');
            },
            (error) => {
                this.isInProgress = false;
                this.notify.showTranslateMessage('InvalidEmailMessge');
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
