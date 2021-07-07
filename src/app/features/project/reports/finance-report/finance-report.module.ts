import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    FinanceReportRoutingModule,
    components as FinanceReportComponent,
} from './finance-report-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [FinanceReportComponent],
    imports: [FinanceReportRoutingModule, SharedModule],
})
export class FinanceReportModule {}
