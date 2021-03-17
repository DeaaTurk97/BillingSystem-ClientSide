import { NgModule } from '@angular/core';

import {
    OperatorRoutingModule,
    components as operatorComponents,
} from './operator-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [operatorComponents],
    imports: [SharedModule, OperatorRoutingModule],
})
export class OperatorModule {}
