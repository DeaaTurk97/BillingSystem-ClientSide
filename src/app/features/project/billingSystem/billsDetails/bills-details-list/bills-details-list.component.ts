import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CallDetailsService } from '@app/infrastructure/core/services/billingSystem/call-details-service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { CallDetailsModel } from '@app/infrastructure/models/project/callDetailsModel';
import { ReportFilterModel } from '@app/infrastructure/models/project/reportFilterModel';
import {
    ActionRowGrid,
    State,
} from '@app/infrastructure/shared/Services/CommonMemmber';
import { catchError, map } from 'rxjs/operators';

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
    public reportFilterModel: ReportFilterModel = new ReportFilterModel();
    public dataSource = new MatTableDataSource<CallDetailsModel>([]);

    constructor(
        private callDetailsService: CallDetailsService,
        private notify: NotificationService,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        //Adding this to get data from rout after execute Resolver
        this.billId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        this.activatedRoute.data
            .pipe(
                map((dataRoute) => {
                    this.dataSource.data = dataRoute.billsDetails.dataRecord;
                    this.length = dataRoute.billsDetails.countRecord;
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage('ErrorOnLoadData');
                }),
            )
            .subscribe((result) => {});
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
}
