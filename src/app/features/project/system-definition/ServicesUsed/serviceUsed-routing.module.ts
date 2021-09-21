import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { AddServiceUsedComponent } from './add-service-used/add-service-used.component';
import { ServiceUsedListComponent } from './service-used-list/service-used-list.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'servicesUsed-list',
                pathMatch: 'full',
            },
            {
                path: 'servicesUsed-list',
                component: ServiceUsedListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ServiceUsedRoutingModule {}

export const components = [ServiceUsedListComponent, AddServiceUsedComponent];
