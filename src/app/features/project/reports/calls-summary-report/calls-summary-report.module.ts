import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    CallsSummaryReportRoutingModule,
    components as CallsSummaryReportComponent,
} from './calls-summary-report-routing.module';

import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [CallsSummaryReportComponent],
    imports: [CommonModule, CallsSummaryReportRoutingModule, SharedModule],
})
export class CallsSummaryReportModule {}
