import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallsSummaryReportListComponent } from './calls-summary-report-list/calls-summary-report-list.component';
import { LandingLayoutComponent } from '@app/features/landing';
const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'calls-summary-report',
                pathMatch: 'full',
            },
            {
                path: 'calls-summary-report',
                component: CallsSummaryReportListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CallsSummaryReportRoutingModule {}

export const components = [CallsSummaryReportListComponent];
