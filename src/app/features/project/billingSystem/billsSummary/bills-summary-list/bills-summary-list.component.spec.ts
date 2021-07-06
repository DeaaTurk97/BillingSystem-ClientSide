import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsSummaryListComponent } from './bills-summary-list.component';

describe('BillsSummaryListComponent', () => {
  let component: BillsSummaryListComponent;
  let fixture: ComponentFixture<BillsSummaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsSummaryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
