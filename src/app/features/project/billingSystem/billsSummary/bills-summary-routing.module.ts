import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { BillsSummaryListComponent } from './bills-summary-list/bills-summary-list.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'billsSummary-list',
                pathMatch: 'full',
            },
            {
                path: 'billsSummary-list',
                component: BillsSummaryListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BillsSummaryRoutingModule {}

export const components = [BillsSummaryListComponent];
