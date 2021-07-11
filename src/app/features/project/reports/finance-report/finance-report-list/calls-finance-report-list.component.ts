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
import { GroupModel } from '@app/infrastructure/models/project/groupModel';
import {
    ActionRowGrid,
    State,
} from '@app/infrastructure/shared/Services/CommonMemmber';
import { catchError, map } from 'rxjs/operators';
import { GroupService } from '@app/infrastructure/core/services/billingSystem/group.service';

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
    public groupsModel: GroupModel[] = [];
    public dataSource = new MatTableDataSource<CallFinanceModel>([]);
    constructor(
        private CallDetailsService: CallDetailsService,
        private notify: NotificationService,
        private groupService: GroupService,
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

    LoadReport() {
        this.reportFilterModel.pageSize = this.pageSize;
        this.reportFilterModel.pageIndex = this.pageIndex;
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
