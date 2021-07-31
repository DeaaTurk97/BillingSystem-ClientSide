import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ViewChild,
    ChangeDetectorRef,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@app/infrastructure/core/services/auth/user.service';
import { CallDetailsService } from '@app/infrastructure/core/services/billingSystem/call-details-service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { DynamicColumn } from '@app/infrastructure/models/gridAddColumns-model';
import { CallDetailsModel } from '@app/infrastructure/models/project/callDetailsModel';
import { ReportFilterModel } from '@app/infrastructure/models/project/reportFilterModel';
import { UnDefinedNumberModel } from '@app/infrastructure/models/project/UnDefinedNumberModel';
import { UserModel } from '@app/infrastructure/models/project/UserModel';
import { ConfirmDialogComponent } from '@app/infrastructure/shared/components/confirm-dialog/confirm-dialog.component';
import { DataGridViewComponent } from '@app/infrastructure/shared/components/data-grid-view/data-grid-view.component';
import {
    ActionRowGrid,
    State,
} from '@app/infrastructure/shared/Services/CommonMemmber';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { DescriptionAndTypeNumberComponent } from '../description-and-type-number/description-and-type-number.component';

@Component({
    selector: 'app-bills-details-list',
    templateUrl: './bills-details-list.component.html',
    styleUrls: ['./bills-details-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillsDetailsListComponent implements OnInit {
    public paginationIndex = 0;
    public pageIndex = 1;
    public pageSize = 10;
    public length = 0;
    public billId = 0;
    public billMonthId = 0;
    public billYearId = null;
    public billUserId = null;
    public isSubmitByAdmin: boolean = false;
    public reportFilterModel: ReportFilterModel = new ReportFilterModel();
    public dataSource = new MatTableDataSource<CallDetailsModel>([]);
    public columns: DynamicColumn[] = [];
    public usersModel: UserModel[] = [];
    public unDefinedNumberModel: UnDefinedNumberModel[] = [];
    public countDefinedNumbers: number = 0;
    @ViewChild(DataGridViewComponent) sharedDataGridView: DataGridViewComponent;

    constructor(
        private callDetailsService: CallDetailsService,
        private notify: NotificationService,
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private changeDetectorRef: ChangeDetectorRef,
        private dialog: MatDialog,
        private route: Router,
    ) {}

    ngOnInit(): void {
        //Adding this to get data from rout after execute Resolver
        this.billId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        this.billMonthId = Number(
            this.activatedRoute.snapshot.paramMap.get('billMonth'),
        );
        this.billYearId = Number(
            this.activatedRoute.snapshot.paramMap.get('billYear'),
        );
        this.billUserId = Number(
            this.activatedRoute.snapshot.paramMap.get('billUser'),
        );
        this.isSubmitByAdmin = Boolean(
            JSON.parse(
                this.activatedRoute.snapshot.paramMap.get('isSubmitByAdmin'),
            ),
        );

        this.activatedRoute.data
            .pipe(
                mergeMap((dataRoute) => {
                    this.dataSource.data = dataRoute.billsDetails.dataRecord;
                    this.length = dataRoute.billsDetails.countRecord;
                    return this.userService.getUsersByCurrentRole();
                }),
                mergeMap((userData) => {
                    this.usersModel = userData;
                    return this.callDetailsService.GetAllUndefinedNumbers(
                        this.billId,
                    );
                }),
                map((unDefinedNumbers) => {
                    this.unDefinedNumberModel = unDefinedNumbers.dataRecord;
                    this.countDefinedNumbers = unDefinedNumbers.countRecord;
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage('ErrorOnLoadData');
                }),
            )
            .subscribe((result) => {
                this.changeDetectorRef.detectChanges();
            });
    }

    getConfigDialog(data, isAddGridHeader?: boolean): MatDialogConfig {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.position = { top: '55px' };
        dialogConfig.width = '70%';
        dialogConfig.data = data;
        return dialogConfig;
    }

    onActionRowGrid(ActionGrid: ActionRowGrid) {
        switch (ActionGrid.type) {
            case State.Pagination:
                this.LoadCallsDetails(
                    ActionGrid.row.pageIndex,
                    ActionGrid.row.pageSize,
                );
                break;
        }
    }

    LoadCallsDetails(pageIndex: number, pageSize: number) {
        this.reportFilterModel.billId = this.billId;
        this.reportFilterModel.pageIndex = pageIndex;
        this.reportFilterModel.pageSize = pageSize;

        this.callDetailsService
            .getCallDetails(this.reportFilterModel)
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

    onSearch(model: any) {
        this.reportFilterModel = model;
        this.LoadCallsDetails(1, 10);
        this.sharedDataGridView.onFirstPage();
    }

    public onSetPhoneNumberType() {
        const dialog = this.dialog.open(
            DescriptionAndTypeNumberComponent,
            this.getConfigDialog({
                unDefinedNumberModel: this.unDefinedNumberModel,
                billId: this.billId,
            }),
        );

        return dialog
            .afterClosed()
            .pipe(
                switchMap((dialogResult) => {
                    if (dialogResult) {
                        this.notify.showTranslateMessage(
                            'UpdatedSuccessfully',
                            false,
                        );
                        //Invoke For SuperAdmin only
                        this.notify.invokeAddedNewNumbersAndBills();

                        return this.callDetailsService.GetAllUndefinedNumbers(
                            this.billId,
                        );
                    } else {
                        this.notify.showTranslateMessage('CancelUpdate');
                        return of(null); //Must return null
                    }
                }),
                mergeMap((unDefinedNumbers) => {
                    if (unDefinedNumbers) {
                        this.unDefinedNumberModel = unDefinedNumbers.dataRecord;
                        this.countDefinedNumbers = unDefinedNumbers.countRecord;
                    }

                    return of({});
                }),
                catchError((): any => {
                    this.notify.showTranslateMessage('ErrorOnUpdate');
                }),
            )
            .subscribe((result) => {});
    }

    submitBill() {
        return this.dialog
            .open(ConfirmDialogComponent, {
                width: '28em',
                height: '11em',
                panelClass: 'confirm-dialog-container',
                position: { top: '5em' },
                disableClose: true,
                data: {
                    messageList: ['SureWantSubmitting'],
                    action: 'Yes',
                    showCancel: true,
                },
            })
            .afterClosed()
            .pipe(
                switchMap((dialogResult: string): any => {
                    if (dialogResult) {
                        return this.callDetailsService.updateSubmitedBill(
                            this.billId,
                        );
                    } else {
                        this.notify.showTranslateMessage('CancelBillSubmit');
                        return of(null);
                    }
                }),
                catchError((): any => {
                    this.notify.showTranslateMessage('ErrorOnSubmitBill');
                }),
            )
            .subscribe((result) => {
                if (result) {
                    this.notify.showTranslateMessage(
                        'SubmittedSuccessfully',
                        false,
                    );

                    //Invoke For SuperAdmin only
                    this.notify.invokeAddedNewNumbersAndBills();
                }
            });
    }
}
