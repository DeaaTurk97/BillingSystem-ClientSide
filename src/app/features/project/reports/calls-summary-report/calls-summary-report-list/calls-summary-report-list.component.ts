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
import { ExportReportService } from '@app/infrastructure/core/services/billingSystem//export-report-service';
import { UserService } from '@app/infrastructure/core/services/auth/user.service';
import { ReportFilterModel } from '@app/infrastructure/models/project/reportFilterModel';
import { CallSummaryModel } from '@app/infrastructure/models/project/CallSummaryModel';
import { GroupModel } from '@app/infrastructure/models/project/groupModel';
import {
    ActionRowGrid,
    State,
} from '@app/infrastructure/shared/Services/CommonMemmber';
import { catchError, map } from 'rxjs/operators';
import { GroupService } from '@app/infrastructure/core/services/billingSystem/group.service';

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
    Total: number;
    public pageSize = 10;
    public length = 0;
    public reportFilterModel: ReportFilterModel = new ReportFilterModel();
    public groupsModel: GroupModel[] = [];
    public dataSource = new MatTableDataSource<CallSummaryModel>([]);
    constructor(
        private CallDetailsService: CallDetailsService,
        private notify: NotificationService,
        private groupService: GroupService,
        private exportReportService: ExportReportService,
        private userService: UserService,
    ) {}

    ngOnInit(): void {
        this.LoadReport();
        this.LoadGroups();
    }

    onActionRowGrid(ActionGrid: ActionRowGrid) {
        switch (ActionGrid.type) {
            case State.Pagination:
                this.pageSize = ActionGrid.row.pageSize;
                this.pageIndex = ActionGrid.row.pageIndex;
                this.LoadReport();
                break;
        }
    }

    onSearch(model: any) {
        this.reportFilterModel = model;
        this.LoadReport();
    }

    onExport(reportType: any) {
        this.reportFilterModel.reportType = reportType;
        this.exportReportService
            .exportCallSummary(this.reportFilterModel)
            .subscribe((result) => {
                window.open(result.urlPath);
            });
    }

    LoadReport() {
        this.reportFilterModel.pageSize = this.pageSize;
        this.reportFilterModel.pageIndex = this.pageIndex;

        this.CallDetailsService.getCallSummary(this.reportFilterModel)
            .pipe(
                map((paginationRecord) => {
                    this.dataSource.data = paginationRecord.dataRecord;
                    this.Total = paginationRecord.dataRecord.freeSum;
                    this.length = paginationRecord.countRecord;
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage('ErrorOnLoadData');
                }),
            )
            .subscribe((result) => {});
    }

    LoadGroups() {
        this.groupService
            .getGroupsByUser()
            .pipe(
                map((data) => {
                    if (data) {
                        this.groupsModel = data;
                    }
                }),
            )
            .subscribe((result) => {});
    }
}
