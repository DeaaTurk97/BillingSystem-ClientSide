import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './imports/material.module';
import { components } from './components';
import { directives } from './directives';
import { pipes } from './pipes';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Connects modules, pipes, directives, components, and more that do not need to be singleton instances.
 */
@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        TranslateModule,
    ],
    exports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        TranslateModule,
        components,
        directives,
        pipes,
    ],
    declarations: [components, directives, pipes],
})
export class SharedModule {
    static forRoot() {
        return {
            ngModule: SharedModule,
        };
    }
}
