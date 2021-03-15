import { NgModule } from '@angular/core';

import {
    LandingRoutingModule,
    components as landingComponents,
} from './landing-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AppHeaderComponent } from './header/header.component';
import { AppSidebarComponent } from './sidebar/sidebar.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {
    LandingPresentationAdminComponent,
    LandingPresentationGuestComponent,
    LandingPresentationStudentComponent,
    LandingPresentationSuperAdminComponent,
} from '.';

@NgModule({
    declarations: [
        AppSidebarComponent,
        AppHeaderComponent,
        LandingPresentationGuestComponent,
        LandingPresentationStudentComponent,
        LandingPresentationAdminComponent,
        LandingPresentationSuperAdminComponent,
        landingComponents,
    ],
    imports: [SharedModule, LandingRoutingModule, PerfectScrollbarModule],
})
export class LandingModule {}
