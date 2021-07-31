import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { BillDetailsResolveService } from '@app/infrastructure/core/services/bill-details-resolve.service';
import { BillsDetailsListComponent } from './bills-details-list/bills-details-list.component';
import { DescriptionAndTypeNumberComponent } from './description-and-type-number/description-and-type-number.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path:
                    'billsDetails-list/:id/:billMonth/:billYear/:billUser/:isSubmitByAdmin',
                redirectTo: 'billsDetails-list',
                pathMatch: 'full',
            },
            {
                path:
                    'billsDetails-list/:id/:billMonth/:billYear/:billUser/:isSubmitByAdmin',
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

export const components = [
    BillsDetailsListComponent,
    DescriptionAndTypeNumberComponent,
];
