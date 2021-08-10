import { NgModule } from '@angular/core';

import {
    AuthRoutingModule,
    components as authRoutedComponents,
} from './auth-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
    declarations: [authRoutedComponents, ForgotPasswordComponent],
    imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
