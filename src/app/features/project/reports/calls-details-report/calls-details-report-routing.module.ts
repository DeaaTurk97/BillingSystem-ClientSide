import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallsDetailsReportListComponent } from './calls-details-report-list/calls-details-report-list.component';

const routes: Routes = [
    {
        path: '',
        component: CallsDetailsReportListComponent,
        children: [
            {
                path: '',
                redirectTo: 'calls-details-report',
                pathMatch: 'full',
            },
            {
                path: 'calls-details-report',
                component: CallsDetailsReportListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CallsDetailsReportRoutingModule {}

export const components = [CallsDetailsReportListComponent];
