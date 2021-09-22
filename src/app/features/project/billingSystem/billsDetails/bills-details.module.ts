import { NgModule } from '@angular/core';
import {
    BillsDetailsRoutingModule,
    components as BillsDetailsListComponent,
} from './bills-details-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [BillsDetailsListComponent],
    imports: [SharedModule, BillsDetailsRoutingModule],
})
export class BillsDetailsModule {}
