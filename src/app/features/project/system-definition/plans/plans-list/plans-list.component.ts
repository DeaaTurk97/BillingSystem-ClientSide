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
import { PlanService } from '@app/infrastructure/core/services/billingSystem/plan.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { PlanModel } from '@app/infrastructure/models/project/planModel';
import { ConfirmDialogComponent } from '@app/infrastructure/shared/components/confirm-dialog/confirm-dialog.component';
import {
    ActionRowGrid,
    State,
} from '@app/infrastructure/shared/Services/CommonMemmber';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CreatePlanComponent } from '../create-plan/create-plan.component';

@Component({
    selector: 'app-plans-list',
    templateUrl: './plans-list.component.html',
    styleUrls: ['./plans-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansListComponent implements OnInit {
    public paginationIndex = 0;
    public pageIndex = 1;
    public pageSize = 10;
    public length = 0;
    public dataSource = new MatTableDataSource<PlanModel>([]);
    public plans: PlanModel;

    constructor(
        private dialog: MatDialog,
        private notify: NotificationService,
        private planService: PlanService,
    ) {}

    getConfigDialog(data, isAddGridHeader?: boolean): MatDialogConfig {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.position = { top: '80px' };
        dialogConfig.width = '74%';
        dialogConfig.data = data;
        (dialogConfig.autoFocus = false), (dialogConfig.maxHeight = '90vh');
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
        this.planService
            .getPlans(pageIndex, pageSize)
            .pipe(
                map((paginationRecord) => {
                    this.dataSource.data = paginationRecord.dataRecord;
                    this.length = paginationRecord.countRecord;
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage('ErrorOnLoadData');
                }),
            )
            .subscribe((result) => {
                result = this.plans;
            });
    }

    onAddRecord() {
        const dialog = this.dialog.open(
            CreatePlanComponent,
            this.getConfigDialog(null),
        );

        return dialog
            .afterClosed()
            .pipe(
                switchMap((dialogResult: string) => {
                    if (dialogResult) {
                        this.LoadOperators(1, this.pageSize);
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

    onEdit(planModel: PlanModel) {
        const dialog = this.dialog.open(
            CreatePlanComponent,
            this.getConfigDialog(planModel),
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

    onDelete(planModel: PlanModel) {
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
                        return this.planService.deletePlan(planModel.id);
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
