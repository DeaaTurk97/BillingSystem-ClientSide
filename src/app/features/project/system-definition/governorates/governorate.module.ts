import { NgModule } from '@angular/core';

import {
    GovernorateRoutingModule,
    components as governorateComponents,
} from './governorate-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [governorateComponents],
    imports: [SharedModule, GovernorateRoutingModule],
})
export class GovernorateModule {}
