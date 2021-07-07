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
import { CallFinanceModel } from '@app/infrastructure/models/project/callFinanceModel';
import {
    ActionRowGrid,
    State,
} from '@app/infrastructure/shared/Services/CommonMemmber';
import { catchError, map } from 'rxjs/operators';

@Component({
    selector: 'app-calls-finance-report-list',
    templateUrl: './calls-finance-report-list.component.html',
    styleUrls: ['./calls-finance-report-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallsFinanceReportListComponent implements OnInit {
    public paginationIndex = 0;
    public pageIndex = 1;
    public pageSize = 10;
    public length = 0;
    public reportFilterModel: ReportFilterModel = new ReportFilterModel();
    public dataSource = new MatTableDataSource<CallFinanceModel>([]);
    constructor(
        private CallDetailsService: CallDetailsService,
        private notify: NotificationService,
    ) {}

    ngOnInit(): void {
        this.LoadReport(this.pageIndex, this.pageSize);
    }

    onActionRowGrid(ActionGrid: ActionRowGrid) {
        switch (ActionGrid.type) {
            case State.Pagination:
                this.LoadReport(
                    ActionGrid.row.pageIndex,
                    ActionGrid.row.pageSize,
                );
                break;
        }
    }

    LoadReport(pageIndex: number, pageSize: number) {
        this.reportFilterModel.pageIndex = pageIndex;
        this.reportFilterModel.pageSize = pageSize;
        this.CallDetailsService.getCallFinance(this.reportFilterModel)
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
