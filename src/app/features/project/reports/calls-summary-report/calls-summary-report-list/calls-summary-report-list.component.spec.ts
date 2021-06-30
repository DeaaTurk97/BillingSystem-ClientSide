import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallsSummaryReportListComponent } from './calls-summary-report-list.component';

describe('CallsSummaryReportListComponent', () => {
    let component: CallsSummaryReportListComponent;
    let fixture: ComponentFixture<CallsSummaryReportListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CallsSummaryReportListComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CallsSummaryReportListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
