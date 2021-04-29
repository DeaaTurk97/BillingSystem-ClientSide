import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminAuthGuard } from '@app/infrastructure/core/guards';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('../auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'landing',
        loadChildren: () =>
            import('../landing/landing.module').then((m) => m.LandingModule),
    },
    {
        path: 'users',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import('../user-managments/users/users.module').then(
                (m) => m.UsersModule,
            ),
    },
    {
        path: 'system-definition',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import(
                '../project/system-definition/system-definition.module'
            ).then((m) => m.SystemDefinitionModule),
    },
    {
        path: 'language-settings',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import(
                '../project/system-definition/languages-settings/language.module'
            ).then((m) => m.LanguageModule),
    },
    {
        path: 'settings',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import('../project/billingSystem/settings/jobs/job.module').then(
                (m) => m.JobModule,
            ),
    },
    {
        path: 'settings',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import(
                '../project/billingSystem/settings/groups/group.module'
            ).then((m) => m.GroupModule),
    },
    {
        path: 'settings',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import(
                '../project/billingSystem/settings/operators/operator.module'
            ).then((m) => m.OperatorModule),
    },
    {
        path: 'settings',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import(
                '../project/billingSystem/settings/countries/country.module'
            ).then((m) => m.GroupModule),
    },
    {
        path: 'settings',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import(
                '../project/billingSystem/settings/governorates/governorate.module'
            ).then((m) => m.GovernorateModule),
    },
    {
        path: 'settings',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import(
                '../project/billingSystem/settings/phonesBook/phoneBook.module'
            ).then((m) => m.PhoneBookModule),
    },
    {
        path: '**',
        component: NotFoundComponent,
        data: { title: 'Not Found' },
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

export const components = [NotFoundComponent];
