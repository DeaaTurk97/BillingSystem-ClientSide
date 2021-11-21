import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationOtpCodeComponent } from './verification-otp-code.component';

describe('VerificationOtpCodeComponent', () => {
    let component: VerificationOtpCodeComponent;
    let fixture: ComponentFixture<VerificationOtpCodeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VerificationOtpCodeComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VerificationOtpCodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
