import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { AddServiceTypeComponent } from './add-service-type/add-service-type.component';
import { ServiceTypeListComponent } from './service-type-list/service-type-list.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'servicesTypes-list',
                pathMatch: 'full',
            },
            {
                path: 'servicesTypes-list',
                component: ServiceTypeListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ServiceTypeRoutingModule {}

export const components = [ServiceTypeListComponent, AddServiceTypeComponent];
