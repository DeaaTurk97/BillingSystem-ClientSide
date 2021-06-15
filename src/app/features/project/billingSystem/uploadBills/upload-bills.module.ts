import { NgModule } from '@angular/core';

import {
    UploadBillsRoutingModule,
    components as UploadBillsComponent,
} from './upload-bills-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [UploadBillsComponent],
    imports: [SharedModule, UploadBillsRoutingModule],
})
export class UploadBillsModule {}
