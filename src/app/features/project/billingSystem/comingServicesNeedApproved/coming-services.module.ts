import { NgModule } from '@angular/core';

import {
    ComingServicesRoutingModule,
    components as comingServicesComponents,
} from './coming-services-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [comingServicesComponents],
    imports: [SharedModule, ComingServicesRoutingModule],
})
export class ComingServicesModule {}
