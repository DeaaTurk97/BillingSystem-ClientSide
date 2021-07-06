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
        path: 'system-definition',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import('../project/system-definition/jobs/job.module').then(
                (m) => m.JobModule,
            ),
    },
    {
        path: 'system-definition',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import('../project/system-definition/groups/group.module').then(
                (m) => m.GroupModule,
            ),
    },
    {
        path: 'system-definition',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import(
                '../project/system-definition/operators/operator.module'
            ).then((m) => m.OperatorModule),
    },
    {
        path: 'system-definition',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import(
                '../project/system-definition/countries/country.module'
            ).then((m) => m.GroupModule),
    },
    {
        path: 'system-definition',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import(
                '../project/system-definition/governorates/governorate.module'
            ).then((m) => m.GovernorateModule),
    },
    {
        path: 'system-definition',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import(
                '../project/system-definition/ServicesTypes/ServiceType.module'
            ).then((m) => m.ServiceTypeModule),
    },
    {
        path: 'bills',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import('../project/billingSystem/phonesBook/phoneBook.module').then(
                (m) => m.PhoneBookModule,
            ),
    },
    {
        path: 'bills',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import(
                '../project/billingSystem/comingNumbers/coming-numbers.module'
            ).then((m) => m.ComingNumbersModule),
    },
    {
        path: 'bills',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import(
                '../project/billingSystem/uploadBills/upload-bills.module'
            ).then((m) => m.UploadBillsModule),
    },
    {
        path: 'bills',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import(
                '../project/billingSystem/billsSummary/bills-summary.module'
            ).then((m) => m.BillsSummaryModule),
    },
    {
        path: 'bills',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import(
                '../project/billingSystem/billsDetails/bills-Details.module'
            ).then((m) => m.BillsDetailsModule),
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
