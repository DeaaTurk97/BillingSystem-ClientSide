import { NgModule } from '@angular/core';

import {
    CountryRoutingModule,
    components as countryComponents,
} from './country-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [countryComponents],
    imports: [SharedModule, CountryRoutingModule],
})
export class GroupModule {}
