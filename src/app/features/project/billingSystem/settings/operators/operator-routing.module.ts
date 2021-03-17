import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { AddOperatorComponent } from './add-operator/add-operator.component';
import { OperatorListComponent } from './operator-list/operator-list.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'operators-list',
                pathMatch: 'full',
            },
            {
                path: 'operators-list',
                component: OperatorListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OperatorRoutingModule {}

export const components = [OperatorListComponent, AddOperatorComponent];
