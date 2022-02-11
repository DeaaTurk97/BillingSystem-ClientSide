import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/infrastructure/shared/shared.module';
import { ManageSubscriptionRoutingModule } from './manage-subscription-routing.module';
import { ManageSubscriptionComponent } from './manage-subscription-list/manage-subscription.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
    declarations: [ManageSubscriptionComponent, HistoryComponent],
    imports: [SharedModule, ManageSubscriptionRoutingModule, CommonModule],
})
export class ManageSubscriptionModule {}
