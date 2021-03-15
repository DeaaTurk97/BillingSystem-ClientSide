import { NgModule } from '@angular/core';

import {
    GroupRoutingModule,
    components as groupComponents,
} from './group-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [groupComponents],
    imports: [SharedModule, GroupRoutingModule],
})
export class GroupModule {}
