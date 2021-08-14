/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {
    ActionRowGrid,
    State,
} from '@app/infrastructure/shared/Services/CommonMemmber';
import { UserModel } from '@app/infrastructure/models/project/UserModel';
import { UserService } from '@app/infrastructure/core/services/auth/user.service';
import { UsersRolesComponent } from '../users-roles/users-roles.component';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { RoleModel } from '@app/infrastructure/models/RoleModel';
import { of } from 'rxjs';
import { ConfirmDialogComponent } from '@app/infrastructure/shared/components/confirm-dialog/confirm-dialog.component';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    public paginationIndex = 0;
    public pageIndex = 1;
    public pageSize = 10;
    public length = 0;
    public dataSource = new MatTableDataSource<UserModel>([]);
    public roles: RoleModel[] = [];

    constructor(
        private userService: UserService,
        private dialog: MatDialog,
        private notify: NotificationService,
    ) {}

    ngOnInit(): void {
        this.loadUsers(this.pageIndex, this.pageSize);
    }

    onEditControlClick(resultClick: State) {
        switch (resultClick) {
            case State.Add:
                this.onAddRecord();
                break;
        }
    }

    applyFilter(searchKey: string): void {
        this.dataSource.filter = searchKey
            ? searchKey.trim().toLocaleLowerCase()
            : '';
    }

    getConfigDialog(data, isAddGridHeader?: boolean): MatDialogConfig {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.position = { top: '80px' };
        dialogConfig.width = '60%';
        dialogConfig.data = data;
        return dialogConfig;
    }

    onActionRowGrid(ActionGrid: ActionRowGrid) {
        switch (ActionGrid.type) {
            case State.Pagination:
                this.pageIndex = ActionGrid.row.pageIndex;
                this.pageSize = ActionGrid.row.pageSize;
                this.loadUsers(
                    ActionGrid.row.pageIndex,
                    ActionGrid.row.pageSize,
                );
                break;
            case State.Edit:
                this.onEdit(ActionGrid.row);
                break;
            case State.Delete:
                this.onDelete(ActionGrid.row);
                break;
        }
    }

    loadUsers(pageIndex: number, pageSize: number) {
        this.userService
            .getUsers(pageIndex, pageSize)
            .pipe(
                mergeMap((paginationRecord) => {
                    this.dataSource.data = paginationRecord.dataRecord;
                    this.length = paginationRecord.countRecord;
                    return this.userService.getAllRoles();
                }),
                map((roles) => {
                    this.roles = roles;
                }),
                catchError((): any => {
                    this.notify.showTranslateMessage('ErrorOnLoadData');
                }),
            )
            .subscribe((result) => {});
    }

    onAddRecord() {
        const dialog = this.dialog.open(
            AddUserComponent,
            this.getConfigDialog(null),
        );

        return dialog
            .afterClosed()
            .pipe(
                switchMap((dialogResult: string) => {
                    if (dialogResult) {
                        this.loadUsers(1, this.pageSize);
                        this.notify.showTranslateMessage(
                            'AddedSuccessfully',
                            false,
                        );
                        return of({});
                    } else {
                        this.notify.showTranslateMessage('CancelAdd');
                        return of({});
                    }
                }),
                catchError((): any => {
                    this.notify.showTranslateMessage('ErrorOnAdd', true);
                }),
            )
            .subscribe((result) => {});
    }

    onEdit(userModel: UserModel) {
        const dialog = this.dialog.open(
            AddUserComponent,
            this.getConfigDialog(userModel),
        );

        return dialog
            .afterClosed()
            .pipe(
                switchMap((dialogResult: string) => {
                    if (dialogResult) {
                        this.loadUsers(1, this.pageSize);
                        this.notify.showTranslateMessage(
                            'UpdatedSuccessfully',
                            false,
                        );
                        return of({});
                    } else {
                        this.notify.showTranslateMessage('CancelUpdate');
                        return of({});
                    }
                }),
                catchError((): any => {
                    this.notify.showTranslateMessage('ErrorOnUpdate');
                }),
            )
            .subscribe((result) => {});
    }

    onDelete(userModel: UserModel) {
        return this.dialog
            .open(ConfirmDialogComponent, {
                width: '28em',
                height: '11em',
                panelClass: 'confirm-dialog-container',
                position: { top: '5em' },
                disableClose: true,
                data: {
                    messageList: ['SureWantDelete'],
                    action: 'Delete',
                    showCancel: true,
                },
            })
            .afterClosed()
            .pipe(
                switchMap((dialogResult: string) => {
                    if (dialogResult) {
                        return this.userService.deleteUser(
                            Number(userModel.id),
                        );
                    } else {
                        this.notify.showTranslateMessage('CancelDelete');
                        return of(null);
                    }
                }),
                catchError((): any => {
                    this.notify.showTranslateMessage('ErrorOnDelete');
                    return of(null);
                }),
            )
            .subscribe((result) => {
                if (result) {
                    this.loadUsers(1, this.pageSize);
                    this.notify.showTranslateMessage('DeletedSuccessfully');
                }
            });
    }
}
