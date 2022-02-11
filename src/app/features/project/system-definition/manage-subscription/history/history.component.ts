import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Inject,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ManageSubscriptionService } from '@app/infrastructure/core/services/billingSystem/manage-subscription.service';
import {
    ActionRowGrid,
    State,
} from '@app/infrastructure/shared/Services/CommonMemmber';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent implements OnInit {
    public dataSource = new MatTableDataSource([]);
    userHistory: any[] = [];
    constructor(
        private dialog: MatDialog,
        private manageSvc: ManageSubscriptionService,
        @Inject(MAT_DIALOG_DATA) data,
    ) {
        this.userHistory = data;
    }

    @Input() phoneNumber: string;

    ngOnInit(): void {}

    closeDialog() {
        this.dialog.closeAll();
    }
}
