import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { AddUserComponent } from './add-user/add-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
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
            {
                path: 'change-password',
                component: ChangePasswordComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}

export const components = [
    UsersListComponent,
    UsersRolesComponent,
    AddUserComponent,
    ChangePasswordComponent,
];
