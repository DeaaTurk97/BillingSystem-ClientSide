import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommingServicesNeedApprovedService } from '@app/infrastructure/core/services/billingSystem/comming-services-need-approved.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { servicesNeedApprovedModel } from '@app/infrastructure/models/project/servicesNeedApprovedModel';
import { StatusCycleBills } from '@app/infrastructure/models/SystemEnum';
import { DataGridViewComponent } from '@app/infrastructure/shared/components/data-grid-view/data-grid-view.component';
import {
    ActionRowGrid,
    State,
} from '@app/infrastructure/shared/Services/CommonMemmber';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-coming-service-list',
    templateUrl: './coming-service-list.component.html',
    styleUrls: ['./coming-service-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComingServiceListComponent implements OnInit {
    public paginationIndex = 0;
    public pageIndex = 1;
    public pageSize = 10;
    public length = 0;
    public dataSource = new MatTableDataSource<servicesNeedApprovedModel>([]);
    @ViewChild(DataGridViewComponent) sharedDataGridView: DataGridViewComponent;
    public ServicesStatus: number[] = [];

    statusCycleBills = Object.keys(StatusCycleBills)
        .filter((f) => !isNaN(Number(f)))
        .map((key) => StatusCycleBills[key]);
    selectedStatusNumber = 1;

    public get StatusCycleResult(): typeof StatusCycleBills {
        return StatusCycleBills;
    }

    constructor(
        private comingServices: CommingServicesNeedApprovedService,
        private notify: NotificationService,
    ) {}

    ngOnInit(): void {
        this.LoadComingServices(this.pageIndex, this.pageSize);
    }

    LoadComingServices(pageIndex: number, pageSize: number) {
        this.comingServices
            .getComingServices(pageIndex, pageSize, 1)
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
            this.comingServices
                .getComingServices(this.pageIndex, this.pageSize, statusId)
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

    onCheckRow(rowsServices: number[]) {
        this.ServicesStatus = rowsServices;
    }

    onApproveRow() {
        this.comingServices
            .approveServices(this.ServicesStatus)
            .pipe(
                mergeMap((usersIdHasNewStatus) => {
                    if (usersIdHasNewStatus) {
                        this.notify.showTranslateMessage(
                            'ServicesApprovedSuccessfully',
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
                        'ErrorOnServicesApproved',
                        true,
                    );
                }),
            )
            .subscribe((result) => {});
    }

    onInprogressRow() {
        this.comingServices
            .inprogressServices(this.ServicesStatus)
            .pipe(
                mergeMap((usersIdHasNewStatus) => {
                    if (usersIdHasNewStatus) {
                        this.notify.showTranslateMessage(
                            'ServicesSubmittedWasInProgress',
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
                        'ErrorOnServicesInprogress',
                        true,
                    );
                }),
            )
            .subscribe((result) => {});
    }

    onRejectRow() {
        this.comingServices
            .rejectServices(this.ServicesStatus)
            .pipe(
                mergeMap((usersIdHasNewStatus) => {
                    if (usersIdHasNewStatus) {
                        this.notify.showTranslateMessage(
                            'ServicesSubmittedWasRejected',
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
                        'ErrorOnServicesRejected',
                        true,
                    );
                }),
            )
            .subscribe((result) => {});
    }
}
