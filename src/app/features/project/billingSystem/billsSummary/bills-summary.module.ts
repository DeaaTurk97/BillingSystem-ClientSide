import { NgModule } from '@angular/core';

import {
    BillsSummaryRoutingModule,
    components as BillsSummaryListComponent,
} from './bills-summary-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [BillsSummaryListComponent],
    imports: [SharedModule, BillsSummaryRoutingModule],
})
export class BillsSummaryModule {}
