import { NgModule } from '@angular/core';
import {
    PlansRoutingModule,
    components as plansComponents,
} from './plans-routing.module';
import { SharedModule } from '@shared/shared.module';
import { PlansListComponent } from './plans-list/plans-list.component';
import { CreatePlanComponent } from './create-plan/create-plan.component';

@NgModule({
    declarations: [PlansListComponent, CreatePlanComponent],

    imports: [SharedModule, PlansRoutingModule],
})
export class PlansModule {}
