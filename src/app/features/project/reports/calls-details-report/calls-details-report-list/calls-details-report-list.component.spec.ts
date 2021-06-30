import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallsDetailsReportListComponent } from './calls-details-report-list.component';

describe('CallsDetailsReportListComponent', () => {
    let component: CallsDetailsReportListComponent;
    let fixture: ComponentFixture<CallsDetailsReportListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CallsDetailsReportListComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CallsDetailsReportListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
