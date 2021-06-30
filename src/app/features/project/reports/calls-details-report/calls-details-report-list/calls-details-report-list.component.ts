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
import { PhoneBookService } from '@app/infrastructure/core/services/billingSystem/phone-book.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { PhoneBookModel } from '@app/infrastructure/models/project/phoneBook';
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
    constructor(
        private phoneBookService: PhoneBookService,
        private dialog: MatDialog,
        private notify: NotificationService,
    ) {}

    ngOnInit(): void {}
}
