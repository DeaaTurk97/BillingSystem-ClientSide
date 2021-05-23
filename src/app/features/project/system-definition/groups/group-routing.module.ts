import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { AddGroupComponent } from './add-group/add-group.component';
import { GroupsListComponent } from './groups-list/groups-list.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'groups-list',
                pathMatch: 'full',
            },
            {
                path: 'groups-list',
                component: GroupsListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GroupRoutingModule {}

export const components = [GroupsListComponent, AddGroupComponent];
