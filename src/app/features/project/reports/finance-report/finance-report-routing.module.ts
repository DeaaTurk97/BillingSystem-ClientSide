import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceReportListComponent } from './finance-report-list/finance-report-list.component';
import { LandingLayoutComponent } from '@app/features/landing';
const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'finance-report',
                pathMatch: 'full',
            },
            {
                path: 'finance-report',
                component: FinanceReportListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FinanceReportRoutingModule {}

export const components = [FinanceReportListComponent];
