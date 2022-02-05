import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { PlansListComponent } from './plans-list/plans-list.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'plans-list',
                pathMatch: 'full',
            },
            {
                path: 'plans-list',
                component: PlansListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlansRoutingModule {}

export const components = [PlansListComponent];
