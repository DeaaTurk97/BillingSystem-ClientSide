import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComingBillsListComponent } from './coming-bills-list.component';

describe('ComingBillsListComponent', () => {
  let component: ComingBillsListComponent;
  let fixture: ComponentFixture<ComingBillsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComingBillsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComingBillsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
