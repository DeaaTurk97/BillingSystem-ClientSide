import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { AddCountryComponent } from './add-country/add-country.component';
import { CountriesListComponent } from './countries-list/countries-list.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'countries-list',
                pathMatch: 'full',
            },
            {
                path: 'countries-list',
                component: CountriesListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CountryRoutingModule {}

export const components = [CountriesListComponent, AddCountryComponent];
