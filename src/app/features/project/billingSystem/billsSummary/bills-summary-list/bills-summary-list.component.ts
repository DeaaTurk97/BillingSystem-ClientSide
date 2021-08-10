import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BillsSummaryService } from '@app/infrastructure/core/services/billingSystem/bills-summary.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { DynamicColumn } from '@app/infrastructure/models/gridAddColumns-model';
import { BillsSummaryModel } from '@app/infrastructure/models/project/billsSummary';
import {
    ActionRowGrid,
    MonthsNames,
    State,
} from '@app/infrastructure/shared/Services/CommonMemmber';
import { catchError, map } from 'rxjs/operators';

@Component({
    selector: 'app-bills-summary-list',
    templateUrl: './bills-summary-list.component.html',
    styleUrls: ['./bills-summary-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillsSummaryListComponent implements OnInit {
    constructor(
        private billsSummaryService: BillsSummaryService,
        private notify: NotificationService,
        private router: Router,
    ) {}

    public paginationIndex = 0;
    public pageIndex = 1;
    public pageSize = 10;
    public length = 0;
    public dataSource = new MatTableDataSource<BillsSummaryModel>([]);
    public columns: DynamicColumn[] = [];

    initialAdditionalColumns(): DynamicColumn[] {
        return (this.columns = [
            {
                headerName: 'Control',
                icon: 'more_vert',
                childColumn: [
                    {
                        name: 'BillDetails',
                        status: State.BillDetails,
                    },
                ],
            },
        ]);
    }

    ngOnInit(): void {
        this.LoadBillsSummary(this.pageIndex, this.pageSize);
    }

    getConfigDialog(data, isAddGridHeader?: boolean): MatDialogConfig {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.position = { top: '80px' };
        dialogConfig.width = '60%';
        dialogConfig.data = data;
        return dialogConfig;
    }

    applyFilter(searchKey: string) {
        this.dataSource.filter = searchKey
            ? searchKey.trim().toLocaleLowerCase()
            : '';
    }

    onActionRowGrid(ActionGrid: ActionRowGrid) {
        switch (ActionGrid.type) {
            case State.Pagination:
                this.LoadBillsSummary(
                    ActionGrid.row.pageIndex,
                    ActionGrid.row.pageSize,
                );
                break;
            case State.BillDetails:
                this.billDetails(
                    ActionGrid.row.id,
                    ActionGrid.row.billMonth,
                    ActionGrid.row.billYear,
                    ActionGrid.row.userId,
                    ActionGrid.row.submittedByAdmin,
                );
                break;
        }
    }

    LoadBillsSummary(pageIndex: number, pageSize: number) {
        this.billsSummaryService
            .getbillSummary(pageIndex, pageSize)
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

    billDetails(
        billId: number,
        billMonth: number,
        billYear: number,
        billUser: number,
        isSubmittedByAdmin: boolean,
    ) {
        this.router.navigate([
            '/bills/billsDetails-list/' +
                billId +
                '/' +
                MonthsNames[billMonth] +
                '/' +
                billYear +
                '/' +
                billUser +
                '/' +
                isSubmittedByAdmin,
        ]);
    }
}
