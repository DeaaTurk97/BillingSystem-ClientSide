import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { BillsDetailsListComponent } from './bills-details-list/bills-details-list.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'billsDetails-list',
                pathMatch: 'full',
            },
            {
                path: 'billsDetails-list',
                component: BillsDetailsListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BillsDetailsRoutingModule {}

export const components = [BillsDetailsListComponent];
