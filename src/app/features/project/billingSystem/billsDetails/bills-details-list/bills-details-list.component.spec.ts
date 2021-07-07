import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsDetailsListComponent } from './bills-details-list.component';

describe('BillsDetailsListComponent', () => {
  let component: BillsDetailsListComponent;
  let fixture: ComponentFixture<BillsDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsDetailsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
