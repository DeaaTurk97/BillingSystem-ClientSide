import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { UserService } from '@app/infrastructure/core/services/auth/user.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguagesService } from '@app/infrastructure/core/services/language/language.service';
import { LanguageModel } from '@app/infrastructure/models/project/LanguageModel';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
    public title: string = 'Billing-System';

    @Output() public emitUserLanguageChanged = new EventEmitter<
        LanguageModel
    >();
    public languages: LanguageModel[] = [];
    public languageSelected: LanguageModel;
    public selectLangId: number;

    private routerEventsSubscription: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private titleService: Title,
        private userService: UserService,
        public translate: TranslateService,
        public languagesService: LanguagesService,
    ) {
        this.languagesService
            .getAllLanguages()
            .pipe(
                tap((languageModels: LanguageModel[]) => {
                    const availableLanguages: string[] = languageModels.map(
                        (l) => l.languageCode,
                    );

                    if (this.userService.isTokenExist()) {
                        this.selectLangId = Number(
                            this.userService.getLanguageId(),
                        );
                        this.languageSelected = languageModels.filter(
                            (lang) => lang.id === this.selectLangId,
                        )[0];

                        translate.setDefaultLang(
                            this.languageSelected.languageCode,
                        );
                        return of({});
                    } else {
                        translate.addLangs(availableLanguages);
                        translate.setDefaultLang(availableLanguages[1]);
                    }
                }),
            )
            .subscribe();
    }

    public ngOnInit(): void {
        this.setPageTitle();
    }

    public ngOnDestroy(): void {
        this.routerEventsSubscription.unsubscribe();
    }

    private setPageTitle(): void {
        this.routerEventsSubscription = this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.activatedRoute),
                map((route) => {
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route;
                }),
                filter((route) => route.outlet === 'primary'),
                mergeMap((route) => route.data),
            )
            .subscribe((event: Data) => {
                const title = event.title
                    ? `${this.title} - ${event.title}`
                    : this.title;
                this.titleService.setTitle(`${title}`);
            });
    }
}
