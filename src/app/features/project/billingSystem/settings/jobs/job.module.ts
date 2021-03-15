import { NgModule } from '@angular/core';

import {
    JobRoutingModule,
    components as jobComponents,
} from './job-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [jobComponents],
    imports: [SharedModule, JobRoutingModule],
})
export class JobModule {}
