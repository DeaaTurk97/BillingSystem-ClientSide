import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { BillDetailsResolveService } from '@app/infrastructure/core/services/bill-details-resolve.service';
import { BillsDetailsListComponent } from './bills-details-list/bills-details-list.component';
import { DescriptionAndTypeNumberComponent } from './description-and-type-number/description-and-type-number.component';
import { ServicesNeedApprovalComponent } from './services-need-approval/services-need-approval.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path:
                    'billsDetails-list/:id/:billMonth/:billYear/:billUser/:isSubmitByAdmin/:isPaid',
                redirectTo: 'billsDetails-list',
                pathMatch: 'full',
            },
            {
                path:
                    'billsDetails-list/:id/:billMonth/:billYear/:billUser/:isSubmitByAdmin/:isPaid',
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
    ServicesNeedApprovalComponent,
];
