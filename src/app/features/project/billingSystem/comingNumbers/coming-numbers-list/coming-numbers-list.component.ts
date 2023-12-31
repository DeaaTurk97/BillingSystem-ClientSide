import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IncomingPhoneNumbersService } from '@app/infrastructure/core/services/billingSystem/incoming-phone-numbers.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { PhoneBookModel } from '@app/infrastructure/models/project/phoneBook';
import { StatusCycleBills } from '@app/infrastructure/models/SystemEnum';
import { DataGridViewComponent } from '@app/infrastructure/shared/components/data-grid-view/data-grid-view.component';
import {
    ActionRowGrid,
    State,
} from '@app/infrastructure/shared/Services/CommonMemmber';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-coming-numbers',
    templateUrl: './coming-numbers-list.component.html',
    styleUrls: ['./coming-numbers-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComingNumbersListComponent implements OnInit {
    public paginationIndex = 0;
    public pageIndex = 1;
    public pageSize = 10;
    public length = 0;
    public dataSource = new MatTableDataSource<PhoneBookModel>([]);
    @ViewChild(DataGridViewComponent) sharedDataGridView: DataGridViewComponent;

    statusCycleBills = Object.keys(StatusCycleBills)
        .filter((f) => !isNaN(Number(f)))
        .map((key) => StatusCycleBills[key]);
    selectedStatusNumber = 1;
    public phoneNumbersStatus: number[] = [];

    public get StatusCycleResult(): typeof StatusCycleBills {
        return StatusCycleBills;
    }

    constructor(
        private incomingPhoneNumbersService: IncomingPhoneNumbersService,
        private notify: NotificationService,
    ) {}

    ngOnInit(): void {
        this.LoadComingNumbers(this.pageIndex, this.pageSize);
    }

    LoadComingNumbers(pageIndex: number, pageSize: number) {
        this.incomingPhoneNumbersService
            .getComingNumbers(pageIndex, pageSize, 1)
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
                    this.changeIncomingNumbers(this.selectedStatusNumber);
                break;
        }
    }

    changeIncomingNumbers(statusId) {
        try {
            this.incomingPhoneNumbersService
                .getComingNumbers(this.pageIndex, this.pageSize, statusId)
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
            this.notify.showTranslateMessage('ErrorWhenChangeQuastions');
        }
    }

    onCheckRow(rowsPhoneNumbers: number[]) {
        this.phoneNumbersStatus = rowsPhoneNumbers;
    }

    onApproveRow() {
        this.incomingPhoneNumbersService
            .approvePhoneNumbers(this.phoneNumbersStatus)
            .pipe(
                mergeMap((usersIdHasNewStatus) => {
                    if (usersIdHasNewStatus) {
                        this.notify.showTranslateMessage(
                            'PhoneNumbersApproved',
                            false,
                        );
                        this.notify.invokeApprovalsCycleNumbersAndBills(
                            usersIdHasNewStatus,
                        );
                        this.changeIncomingNumbers(this.selectedStatusNumber);
                        this.sharedDataGridView.rowsSelection = [];
                    }
                    return of({});
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage(
                        'ErrorOnPhoneNumbersApproved',
                        true,
                    );
                }),
            )
            .subscribe((result) => {});
    }

    onInprogressRow() {
        this.incomingPhoneNumbersService
            .inprogressPhoneNumbers(this.phoneNumbersStatus)
            .pipe(
                mergeMap((usersIdHasNewStatus) => {
                    if (usersIdHasNewStatus) {
                        this.notify.showTranslateMessage(
                            'PhoneNumbersInprogressed',
                            false,
                        );
                        this.notify.invokeApprovalsCycleNumbersAndBills(
                            usersIdHasNewStatus,
                        );
                        this.changeIncomingNumbers(this.selectedStatusNumber);
                        this.sharedDataGridView.rowsSelection = [];
                    }

                    return of({});
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage(
                        'ErrorOnPhoneNumbersInprogress',
                        true,
                    );
                }),
            )
            .subscribe((result) => {});
    }

    onRejectRow() {
        this.incomingPhoneNumbersService
            .rejectPhoneNumbers(this.phoneNumbersStatus)
            .pipe(
                mergeMap((usersIdHasNewStatus) => {
                    if (usersIdHasNewStatus) {
                        this.notify.showTranslateMessage(
                            'PhoneNumbersRejected',
                            false,
                        );

                        this.notify.invokeApprovalsCycleNumbersAndBills(
                            usersIdHasNewStatus,
                        );
                        this.changeIncomingNumbers(this.selectedStatusNumber);
                        this.sharedDataGridView.rowsSelection = [];
                    }

                    return of({});
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage(
                        'ErrorOnPhoneNumbersRejected',
                        true,
                    );
                }),
            )
            .subscribe((result) => {});
    }
}
