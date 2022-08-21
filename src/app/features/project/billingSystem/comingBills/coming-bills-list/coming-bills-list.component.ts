import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ComingBillsService } from '@app/infrastructure/core/services/billingSystem/coming-bills.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { TokenService } from '@app/infrastructure/core/services/token.service';
import { BillsSummaryModel } from '@app/infrastructure/models/project/billsSummary';
import { StatusCycleBills } from '@app/infrastructure/models/SystemEnum';
import { ConfirmDialogComponent } from '@app/infrastructure/shared/components/confirm-dialog/confirm-dialog.component';
import { DataGridViewComponent } from '@app/infrastructure/shared/components/data-grid-view/data-grid-view.component';
import {
    ActionRowGrid,
    State,
} from '@app/infrastructure/shared/Services/CommonMemmber';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-coming-bills-list',
    templateUrl: './coming-bills-list.component.html',
    styleUrls: ['./coming-bills-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComingBillsListComponent implements OnInit {
    public paginationIndex = 0;
    public pageIndex = 1;
    public pageSize = 10;
    public length = 0;
    public dataSource = new MatTableDataSource<BillsSummaryModel>([]);
    @ViewChild(DataGridViewComponent) sharedDataGridView: DataGridViewComponent;

    statusCycleBills = Object.keys(StatusCycleBills)
        .filter((f) => !isNaN(Number(f)))
        .map((key) => StatusCycleBills[key]);
    selectedStatusBill = 1;
    public billsStatus: number[] = [];

    public get StatusCycleResult(): typeof StatusCycleBills {
        return StatusCycleBills;
    }

    get isSuperAdminUser(): Observable<boolean> {
        return this.tokenService.isSuperAdmin();
    }

    get isFinanceUser(): Observable<boolean> {
        return this.tokenService.isFinance();
    }

    constructor(
        private comingBillsService: ComingBillsService,
        private notify: NotificationService,
        private dialog: MatDialog,
        private tokenService: TokenService,
    ) {}

    ngOnInit(): void {
        this.LoadComingBills(this.pageIndex, this.pageSize);
    }

    LoadComingBills(pageIndex: number, pageSize: number) {
        this.comingBillsService
            .getComingBills(pageIndex, pageSize, 1)
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
                this.sharedDataGridView.setSelection();
            });
    }

    onActionRowGrid(ActionGrid: ActionRowGrid) {
        switch (ActionGrid.type) {
            case State.Check:
                this.onCheckRow(ActionGrid.row);
                break;
            case State.Pagination:
                (this.pageIndex = ActionGrid.row.pageIndex),
                    (this.pageSize = ActionGrid.row.pageSize),
                    this.changeIncomingBills(this.selectedStatusBill);
                break;
        }
    }

    changeIncomingBills(statusId) {
        try {
            this.comingBillsService
                .getComingBills(this.pageIndex, this.pageSize, statusId)
                .subscribe(
                    (paginationRecord) => {
                        this.dataSource.data = paginationRecord.dataRecord;
                        this.length = paginationRecord.countRecord;
                    },
                    (error) => {
                        this.notify.showTranslateMessage('ErrorOnLoadData');
                    },
                );
        } catch (error) {
            this.notify.showTranslateMessage('ErrorWhenChangeStatusBill');
        }
    }

    onCheckRow(rowsBills: number[]) {
        this.billsStatus = rowsBills;
        console.log(this.billsStatus);
        console.log(rowsBills);
    }

    onApproveRow() {
        this.comingBillsService
            .approveBills(this.billsStatus)
            .pipe(
                mergeMap((usersIdHasNewStatus) => {
                    if (usersIdHasNewStatus) {
                        this.notify.showTranslateMessage(
                            'BillsApproved',
                            false,
                        );
                        this.notify.invokeApprovalsCycleNumbersAndBills(
                            usersIdHasNewStatus,
                        );
                        this.changeIncomingBills(this.selectedStatusBill);
                        this.sharedDataGridView.rowsSelection = [];
                    }
                    return of({});
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage(
                        'ErrorOnBillsApproved',
                        true,
                    );
                }),
            )
            .subscribe((result) => {});
    }

    onInprogressRow() {
        this.comingBillsService
            .inprogressBills(this.billsStatus)
            .pipe(
                mergeMap((usersIdHasNewStatus) => {
                    if (usersIdHasNewStatus) {
                        this.notify.showTranslateMessage(
                            'BillsInprogressed',
                            false,
                        );
                        this.notify.invokeApprovalsCycleNumbersAndBills(
                            usersIdHasNewStatus,
                        );
                        this.changeIncomingBills(this.selectedStatusBill);
                        this.sharedDataGridView.rowsSelection = [];
                    }

                    return of({});
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage(
                        'ErrorOnBillsInprogress',
                        true,
                    );
                }),
            )
            .subscribe((result) => {});
    }

    onRejectRow() {
        this.comingBillsService
            .rejectBills(this.billsStatus)
            .pipe(
                mergeMap((usersIdHasNewStatus) => {
                    if (usersIdHasNewStatus) {
                        this.notify.showTranslateMessage(
                            'BillsRejected',
                            false,
                        );
                        this.notify.invokeApprovalsCycleNumbersAndBills(
                            usersIdHasNewStatus,
                        );
                        this.changeIncomingBills(this.selectedStatusBill);
                        this.sharedDataGridView.rowsSelection = [];
                    }

                    return of({});
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage(
                        'ErrorOnBillsRejected',
                        true,
                    );
                }),
            )
            .subscribe((result) => {});
    }

    onPay() {
        if (this.billsStatus.length <= 0) {
            return;
        }
        return this.dialog
            .open(ConfirmDialogComponent, {
                width: '28em',
                height: '11em',
                panelClass: 'confirm-dialog-container',
                position: { top: '5em' },
                disableClose: true,
                data: {
                    messageList: ['SureWantPaid'],
                    action: 'Yes',
                    showCancel: true,
                },
            })
            .afterClosed()
            .pipe(
                switchMap((dialogResult: string) => {
                    if (dialogResult) {
                        return this.comingBillsService.payBills(
                            this.billsStatus,
                        );
                    } else {
                        this.notify.showTranslateMessage('CancelBillPaid');
                        return of(null);
                    }
                }),
                catchError((): any => {
                    this.notify.showTranslateMessage('ErrorOnPaidBill');
                }),
            )
            .subscribe((usersIdHasNewStatus) => {
                if (usersIdHasNewStatus) {
                    this.notify.invokeApprovalsCycleNumbersAndBills(
                        usersIdHasNewStatus,
                    );
                    this.changeIncomingBills(this.selectedStatusBill);
                    this.sharedDataGridView.rowsSelection = [];
                    this.notify.showTranslateMessage('PaidSuccessfully');
                }
            });
    }
}
