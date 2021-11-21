import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full',
            },
            {
                path: 'login',
                component: LoginComponent,
                data: { title: 'Login' },
            },
            {
                path: 'register',
                component: RegisterComponent,
                data: { title: 'Register' },
            },
            {
                path: 'reset-password',
                component: ResetPasswordComponent,
                data: { title: 'ResetPassword' },
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent,
                data: { title: 'ResetPassword' },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}

export const components = [
    AuthLayoutComponent,
    RegisterComponent,
    LoginComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
];
