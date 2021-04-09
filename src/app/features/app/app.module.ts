import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import {
    AppRoutingModule,
    components as mainComponents,
} from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '@env/environment';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressModule } from 'ngx-progressbar';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlService } from '@app/infrastructure/shared/Services/mat-paginator-intl.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
    declarations: [AppComponent, mainComponents],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CoreModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
                deps: [HttpClient],
            },
        }),
        JwtModule.forRoot({
            config: {
                tokenGetter: () => sessionStorage.getItem('authToken'),
                allowedDomains: [environment.apiRoute],
            },
        }),
        NgProgressHttpModule,
        NgProgressModule.withConfig({
            color: '#FF0000',
            spinner: false,
        }),
        SharedModule.forRoot(),
        AppRoutingModule,
        PerfectScrollbarModule,
    ],
    providers: [
        {
            provide: MatPaginatorIntl,
            useClass: MatPaginatorIntlService,
        },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' },
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
