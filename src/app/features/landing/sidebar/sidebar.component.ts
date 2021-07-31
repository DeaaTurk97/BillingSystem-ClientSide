import {
    ChangeDetectorRef,
    Component,
    NgZone,
    OnDestroy,
    ViewChild,
    HostListener,
    Directive,
    AfterViewInit,
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '@models/menu-items';
import { AuthService } from '@app/infrastructure/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '@app/infrastructure/core/services/token.service';
import { UserType } from '@app/infrastructure/models/user';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: [],
})
export class AppSidebarComponent implements OnDestroy {
    public config: PerfectScrollbarConfigInterface = {};
    mobileQuery: MediaQueryList;

    private mobileQueryListener: () => void;
    status: boolean = true;
    itemSelect: number[] = [];

    subclickEvent() {
        this.status = true;
    }

    constructor(
        private authService: AuthService,
        private router: Router,
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        public menuItems: MenuItems,
        private tokenService: TokenService,
    ) {
        this.mobileQuery = media.matchMedia('(min-width: 768px)');
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();

        this.mobileQuery.addEventListener('change', () => {
            this.mobileQueryListener();
        });
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeEventListener('change', () => {
            this.mobileQueryListener();
        });
    }

    public logout(): void {
        this.authService.loggedOut();
        this.router.navigateByUrl('/auth');
    }

    isRoleMatch(rolesMatch: UserType[]) {
        let isMatch = false;

        if (rolesMatch) {
            this.tokenService
                .isRolesMatch(rolesMatch)
                .pipe(
                    map((data) => {
                        isMatch = data;
                    }),
                )
                .subscribe((result) => {});
        }

        return isMatch;
    }
}
