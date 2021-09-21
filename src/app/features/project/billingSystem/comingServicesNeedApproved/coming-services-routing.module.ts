import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { ComingServiceListComponent } from './coming-service-list/coming-service-list.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'comingServices-list',
                pathMatch: 'full',
            },
            {
                path: 'comingServices-list',
                component: ComingServiceListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComingServicesRoutingModule {}

export const components = [ComingServiceListComponent];
