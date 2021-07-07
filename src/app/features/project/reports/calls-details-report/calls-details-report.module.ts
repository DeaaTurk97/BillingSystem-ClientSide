import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    CallsDetailsReportRoutingModule,
    components as CallsDetailsReportComponent,
} from './calls-details-report-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [CallsDetailsReportComponent],
    imports: [CommonModule, CallsDetailsReportRoutingModule, SharedModule],
})
export class CallsDetailsReportModule {}
