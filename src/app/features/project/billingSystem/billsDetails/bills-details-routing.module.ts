import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { BillDetailsResolveService } from '@app/infrastructure/core/services/bill-details-resolve.service';
import { BillsDetailsListComponent } from './bills-details-list/bills-details-list.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: 'billsDetails-list/:id',
                redirectTo: 'billsDetails-list',
                pathMatch: 'full',
            },
            {
                path: 'billsDetails-list/:id',
                component: BillsDetailsListComponent,
                resolve: {
                    billsDetails: BillDetailsResolveService,
                },
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
