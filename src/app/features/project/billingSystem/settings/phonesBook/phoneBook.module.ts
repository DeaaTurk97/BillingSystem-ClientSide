import { NgModule } from '@angular/core';

import {
    PhoneBookRoutingModule,
    components as phoneBookComponents,
} from './PhoneBook-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [phoneBookComponents],
    imports: [SharedModule, PhoneBookRoutingModule],
})
export class PhoneBookModule {}
