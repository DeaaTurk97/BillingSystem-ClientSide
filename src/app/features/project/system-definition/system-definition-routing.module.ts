import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '@app/features/landing';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { LanguagesListComponent } from './languages-settings/languagesList/languages-list.component';

const routes: Routes = [
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'general-settings',
                pathMatch: 'full',
            },
            {
                path: 'general-settings',
                component: GeneralSettingsComponent,
            },
            {
                path: 'languages-settings',
                component: LanguagesListComponent,
            },
        ],
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SystemDefinitionRoutingModule {}

export const components = [GeneralSettingsComponent];
