import { NgModule } from '@angular/core';

import {
    ServiceUsedRoutingModule,
    components as serviceTypeComponents,
} from './serviceUsed-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [serviceTypeComponents],
    imports: [SharedModule, ServiceUsedRoutingModule],
})
export class ServiceUsedModule {}
