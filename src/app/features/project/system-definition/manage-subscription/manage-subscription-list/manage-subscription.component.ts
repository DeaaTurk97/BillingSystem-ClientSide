import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '@app/infrastructure/core/services/auth/user.service';
import { UserModel } from '@app/infrastructure/models/project/UserModel';
import { mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-manage-subscription',
    templateUrl: './manage-subscription.component.html',
    styleUrls: ['./manage-subscription.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageSubscriptionComponent implements OnInit {
    public user: UserModel;
    public pageIndex = 1;
    public pageSize = 10;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.loadUsers(this.pageIndex, this.pageSize);
    }

    loadUsers(pageIndex: number, pageSize: number) {
        this.userService
            .getUsers(pageIndex, pageSize)
            .subscribe((result) => {});
    }
}
