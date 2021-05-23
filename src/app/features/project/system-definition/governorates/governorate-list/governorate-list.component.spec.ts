import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernorateListComponent } from './governorate-list.component';

describe('GovernorateListComponent', () => {
  let component: GovernorateListComponent;
  let fixture: ComponentFixture<GovernorateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernorateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernorateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
