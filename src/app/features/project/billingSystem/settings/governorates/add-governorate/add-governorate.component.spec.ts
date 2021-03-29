import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGovernorateComponent } from './add-governorate.component';

describe('AddGovernorateComponent', () => {
  let component: AddGovernorateComponent;
  let fixture: ComponentFixture<AddGovernorateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGovernorateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGovernorateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
