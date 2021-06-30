import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-calls-summary-report-list',
    templateUrl: './calls-summary-report-list.component.html',
    styleUrls: ['./calls-summary-report-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallsSummaryReportListComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
