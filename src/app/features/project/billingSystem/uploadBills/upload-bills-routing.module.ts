import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { UploadBillsLebanonComponent } from './upload-bills-lebanon/upload-bills-lebanon.component';
import { UploadBillsComponent } from './upload-bills/upload-bills.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'upload-bills',
                pathMatch: 'full',
            },
            {
                path: 'upload-bills',
                component: UploadBillsComponent,
            },
            {
                path: 'upload-bills-lebanon',
                component: UploadBillsLebanonComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UploadBillsRoutingModule {}

export const components = [UploadBillsComponent, UploadBillsLebanonComponent];
