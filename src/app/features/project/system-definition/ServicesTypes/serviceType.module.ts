import { NgModule } from '@angular/core';

import {
    ServiceTypeRoutingModule,
    components as serviceTypeComponents,
} from './serviceType-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [serviceTypeComponents],
    imports: [SharedModule, ServiceTypeRoutingModule],
})
export class ServiceTypeModule {}
