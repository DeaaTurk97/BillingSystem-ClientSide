import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallsFinanceReportListComponent } from './finance-report-list/calls-finance-report-list.component';
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
                component: CallsFinanceReportListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FinanceReportRoutingModule {}

export const components = [CallsFinanceReportListComponent];
