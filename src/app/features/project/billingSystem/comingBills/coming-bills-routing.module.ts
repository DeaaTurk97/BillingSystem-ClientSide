import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { ComingBillsListComponent } from './coming-bills-list/coming-bills-list.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'comingBills-list',
                pathMatch: 'full',
            },
            {
                path: 'comingBills-list',
                component: ComingBillsListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComingBillsRoutingModule {}

export const components = [ComingBillsListComponent];
