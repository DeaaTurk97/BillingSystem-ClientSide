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
import { CallsDetailsReportService } from '@app/infrastructure/core/services/billingSystem/calls-details-report.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { ReportFilterModel } from '@app/infrastructure/models/project/reportFilterModel';
import { CallsDetailsReportModel } from '@app/infrastructure/models/project/callsDetailsReportModel';
import { ConfirmDialogComponent } from '@app/infrastructure/shared/components/confirm-dialog/confirm-dialog.component';
import { DataGridViewComponent } from '@app/infrastructure/shared/components/data-grid-view/data-grid-view.component';
import {
    ActionRowGrid,
    ResultActions,
    State,
} from '@app/infrastructure/shared/Services/CommonMemmber';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-calls-details-report-list',
    templateUrl: './calls-details-report-list.component.html',
    styleUrls: ['./calls-details-report-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallsDetailsReportListComponent implements OnInit {
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    public paginationIndex = 0;
    public pageIndex = 1;
    public pageSize = 10;
    public length = 0;
    public reportFilterModel: ReportFilterModel = new ReportFilterModel();
    public dataSource = new MatTableDataSource<CallsDetailsReportModel>([]);
    constructor(
        private callsDetailsReportService: CallsDetailsReportService,
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
        //this.reportFilterModel.userId = 1;
        this.reportFilterModel.pageIndex = pageIndex;
        this.reportFilterModel.pageSize = pageSize;
        this.callsDetailsReportService
            .getReport(this.reportFilterModel)
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
