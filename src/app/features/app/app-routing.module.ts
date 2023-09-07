import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    AuthGuard,
    SuperAdminAuthGuard,
} from '@app/infrastructure/core/guards';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
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
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
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
                '../project/system-definition/ServicesUsed/serviceUsed.module'
            ).then((m) => m.ServiceUsedModule),
    },
    {
        path: 'system-definition',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import('../project/system-definition/plans/plans.module').then(
                (m) => m.PlansModule,
            ),
    },
    {
        path: 'system-definition',
        canActivate: [SuperAdminAuthGuard],
        canActivateChild: [SuperAdminAuthGuard],
        loadChildren: () =>
            import(
                '../project/system-definition/manage-subscription/manage-subscription.module'
            ).then((m) => m.ManageSubscriptionModule),
    },
    {
        path: 'phonesBook',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        loadChildren: () =>
            import('../project/billingSystem/phonesBook/phoneBook.module').then(
                (m) => m.PhoneBookModule,
            ),
    },
    {
        path: 'phonesBook',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
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
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        loadChildren: () =>
            import(
                '../project/billingSystem/billsSummary/bills-summary.module'
            ).then((m) => m.BillsSummaryModule),
    },
    {
        path: 'bills',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        loadChildren: () =>
            import(
                '../project/billingSystem/comingBills/coming-bills.module'
            ).then((m) => m.ComingNumbersModule),
    },
    {
        path: 'bills',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        loadChildren: () =>
            import(
                '../project/billingSystem/billsDetails/bills-Details.module'
            ).then((m) => m.BillsDetailsModule),
    },
    {
        path: 'bills',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        loadChildren: () =>
            import(
                '../project/billingSystem/comingServicesNeedApproved/coming-services.module'
            ).then((m) => m.ComingServicesModule),
    },
    {
        path: 'reports',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        loadChildren: () =>
            import(
                '../project/reports/calls-details-report/calls-details-report.module'
            ).then((m) => m.CallsDetailsReportModule),
    },
    {
        path: 'reports',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        loadChildren: () =>
            import(
                '../project/reports/calls-summary-report/calls-summary-report.module'
            ).then((m) => m.CallsSummaryReportModule),
    },
    {
        path: 'reports',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        loadChildren: () =>
            import(
                '../project/reports/finance-report/finance-report.module'
            ).then((m) => m.FinanceReportModule),
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
