import { NgModule } from '@angular/core';

import {
    ComingNumbersRoutingModule,
    components as incomingNumbersComponents,
} from './coming-numbers-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [incomingNumbersComponents],
    imports: [SharedModule, ComingNumbersRoutingModule],
})
export class ComingNumbersModule {}
