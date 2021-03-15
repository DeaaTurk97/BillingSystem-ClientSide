import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersRolesComponent } from './users-roles/users-roles.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'users-list',
                pathMatch: 'full',
            },
            {
                path: 'users-list',
                component: UsersListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}

export const components = [UsersListComponent, UsersRolesComponent];
