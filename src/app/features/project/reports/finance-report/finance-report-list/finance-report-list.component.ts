import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-finance-report-list',
    templateUrl: './finance-report-list.component.html',
    styleUrls: ['./finance-report-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinanceReportListComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
