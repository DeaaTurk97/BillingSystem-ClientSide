import { NgModule } from '@angular/core';

import {
    ComingBillsRoutingModule,
    components as incomingNumbersComponents,
} from './coming-bills-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [incomingNumbersComponents],
    imports: [SharedModule, ComingBillsRoutingModule],
})
export class ComingNumbersModule {}
