import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { ManageSubscriptionComponent } from './manage-subscription-list/manage-subscription.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'manage-subscription',
                pathMatch: 'full',
            },
            {
                path: 'manage-subscription',
                component: ManageSubscriptionComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManageSubscriptionRoutingModule {}

export const components = [ManageSubscriptionComponent];
