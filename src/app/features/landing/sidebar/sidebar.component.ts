import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { Menu, MenuItems } from '@models/menu-items';
import { AuthService } from '@app/infrastructure/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '@app/infrastructure/core/services/token.service';
import { UserType } from '@app/infrastructure/models/user';
import { map } from 'rxjs/operators';
import { appendFile } from 'fs';
import { number } from 'ngx-custom-validators/src/app/number/validator';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class AppSidebarComponent implements OnDestroy {
    public config: PerfectScrollbarConfigInterface = {};
    mobileQuery: MediaQueryList;
    private mobileQueryListener: () => void;
    status: boolean = true;
    itemSelect: number[] = [];
    sub: Menu;
    subItems: Menu[];

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

        this.subItems = this.menuItems.getMenuitem();

        let Url = this.router.url;
        for (let i = 0; i < this.subItems.length; i++) {
            if (Url.includes(this.subItems[i].state)) {
                this.sub = this.subItems[i];
            }
        }
    }

    subItem(menuitem) {
        this.sub = menuitem;
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
