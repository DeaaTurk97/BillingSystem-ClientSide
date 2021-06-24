import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OperatorService } from '@app/infrastructure/core/services/billingSystem/operator.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { OperatorModel } from '@app/infrastructure/models/project/operatorModel';
import { ConfirmDialogComponent } from '@app/infrastructure/shared/components/confirm-dialog/confirm-dialog.component';
import {
    ActionRowGrid,
    State,
} from '@app/infrastructure/shared/Services/CommonMemmber';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AddOperatorComponent } from '../add-operator/add-operator.component';

@Component({
    selector: 'app-operator-list',
    templateUrl: './operator-list.component.html',
    styleUrls: ['./operator-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperatorListComponent implements OnInit {
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    public paginationIndex = 0;
    public pageIndex = 1;
    public pageSize = 10;
    public length = 0;
    public dataSource = new MatTableDataSource<OperatorModel>([]);

    constructor(
        private operatorService: OperatorService,
        private dialog: MatDialog,
        private notify: NotificationService,
    ) {}

    getConfigDialog(data, isAddGridHeader?: boolean): MatDialogConfig {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.position = { top: '80px' };
        dialogConfig.width = '60%';
        dialogConfig.data = data;
        return dialogConfig;
    }

    ngOnInit(): void {
        this.LoadOperators(this.pageIndex, this.pageSize);
    }

    onEditControlClick(resultClick: State) {
        switch (resultClick) {
            case State.Add:
                this.onAddRecord();
                break;
        }
    }

    applyFilter(searchKey: string) {
        this.dataSource.filter = searchKey
            ? searchKey.trim().toLocaleLowerCase()
            : '';
    }

    onActionRowGrid(ActionGrid: ActionRowGrid) {
        switch (ActionGrid.type) {
            case State.Edit:
                this.onEdit(ActionGrid.row);
                break;
            case State.Delete:
                this.onDelete(ActionGrid.row);
                break;
            case State.Pagination:
                this.LoadOperators(
                    ActionGrid.row.pageIndex,
                    ActionGrid.row.pageSize,
                );
                break;
        }
    }

    LoadOperators(pageIndex: number, pageSize: number) {
        this.operatorService
            .getOperators(pageIndex, pageSize)
            .pipe(
                map((paginationRecord) => {
                    this.dataSource.data = paginationRecord.dataRecord;
                    this.length = paginationRecord.countRecord;
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage('ErrorOnLoadData');
                }),
            )
            .subscribe((result) => {});
    }

    onAddRecord() {
        const dialog = this.dialog.open(
            AddOperatorComponent,
            this.getConfigDialog(null),
        );

        return dialog
            .afterClosed()
            .pipe(
                switchMap((dialogResult: string) => {
                    if (dialogResult) {
                        this.LoadOperators(1, this.pageSize);
                        this.dataSource.paginator = this.paginator;
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

    onEdit(operatorModel: OperatorModel) {
        const dialog = this.dialog.open(
            AddOperatorComponent,
            this.getConfigDialog(operatorModel),
        );

        return dialog
            .afterClosed()
            .pipe(
                switchMap((dialogResult: string) => {
                    if (dialogResult) {
                        this.LoadOperators(1, this.pageSize);
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

    onDelete(operatorModel: OperatorModel) {
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
                        return this.operatorService.deleteOperator(
                            operatorModel.id,
                        );
                    } else {
                        this.notify.showTranslateMessage('CancelDelete');
                        return of({});
                    }
                }),
                catchError((): any => {
                    this.notify.showTranslateMessage('ErrorOnDelete');
                }),
            )
            .subscribe((result) => {
                this.LoadOperators(1, this.pageSize);
                this.notify.showTranslateMessage('DeletedSuccessfully');
            });
    }
}
