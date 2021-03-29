import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { AddGovernorateComponent } from './add-governorate/add-governorate.component';
import { GovernorateListComponent } from './governorate-list/governorate-list.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'governorates-list',
                pathMatch: 'full',
            },
            {
                path: 'governorates-list',
                component: GovernorateListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GovernorateRoutingModule {}

export const components = [GovernorateListComponent, AddGovernorateComponent];
