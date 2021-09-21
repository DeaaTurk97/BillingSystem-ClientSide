import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesNeedApprovalComponent } from './services-need-approval.component';

describe('ServicesNeedApprovalComponent', () => {
  let component: ServicesNeedApprovalComponent;
  let fixture: ComponentFixture<ServicesNeedApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesNeedApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesNeedApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
