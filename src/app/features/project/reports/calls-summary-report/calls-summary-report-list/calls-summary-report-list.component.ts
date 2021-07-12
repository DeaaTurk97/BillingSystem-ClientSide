import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ViewChild,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CallDetailsService } from '@app/infrastructure/core/services/billingSystem/call-details-service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { ReportFilterModel } from '@app/infrastructure/models/project/reportFilterModel';
import { CallSummaryModel } from '@app/infrastructure/models/project/CallSummaryModel';
import {
    ActionRowGrid,
    State,
} from '@app/infrastructure/shared/Services/CommonMemmber';
import { catchError, map } from 'rxjs/operators';

@Component({
    selector: 'app-calls-summary-report-list',
    templateUrl: './calls-summary-report-list.component.html',
    styleUrls: ['./calls-summary-report-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallsSummaryReportListComponent implements OnInit {
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    public paginationIndex = 0;
    public pageIndex = 1;
    public pageSize = 10;
    public length = 0;
    public reportFilterModel: ReportFilterModel = new ReportFilterModel();
    public dataSource = new MatTableDataSource<CallSummaryModel>([]);
    constructor(
        private CallDetailsService: CallDetailsService,
        private notify: NotificationService,
    ) {}

    ngOnInit(): void {
        this.LoadReport(null);
    }

    onActionRowGrid(ActionGrid: ActionRowGrid) {
        switch (ActionGrid.type) {
            case State.Pagination:
                this.pageSize = ActionGrid.row.pageSize;
                this.pageIndex = ActionGrid.row.pageIndex;
                ActionGrid.row.pageSize, this.LoadReport(null);
                break;
        }
    }

    onSearch(model: any) {
        console.log(model);
        this.LoadReport(model);
    }

    LoadReport(model: ReportFilterModel) {
        this.reportFilterModel.fromDate = model != null ? model.fromDate : null;
        this.reportFilterModel.toDate = model != null ? model.toDate : null;
        this.reportFilterModel.pageIndex = this.pageIndex;
        this.reportFilterModel.pageSize = this.pageSize;

        this.CallDetailsService.getCallSummary(this.reportFilterModel)
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
