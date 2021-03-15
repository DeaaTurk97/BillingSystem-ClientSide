import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { AddJobComponent } from './addJob/add-job.component';
import { JobsListComponent } from './jobsList/jobs-list.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'jobs-list',
                pathMatch: 'full',
            },
            {
                path: 'jobs-list',
                component: JobsListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class JobRoutingModule {}

export const components = [JobsListComponent, AddJobComponent];
