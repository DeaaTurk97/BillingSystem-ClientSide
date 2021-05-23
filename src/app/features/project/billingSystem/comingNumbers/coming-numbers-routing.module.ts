import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { ComingNumbersListComponent } from './coming-numbers-list/coming-numbers-list.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'comingNumbers-list',
                pathMatch: 'full',
            },
            {
                path: 'comingNumbers-list',
                component: ComingNumbersListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComingNumbersRoutingModule {}

export const components = [ComingNumbersListComponent];
