import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { AddPhoneBookComponent } from './add-phone-book/add-phone-book.component';
import { PhoneBookListComponent } from './phone-book-list/phone-book-list.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'phonesBook-list',
                pathMatch: 'full',
            },
            {
                path: 'phonesBook-list',
                component: PhoneBookListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PhoneBookRoutingModule {}

export const components = [PhoneBookListComponent, AddPhoneBookComponent];
