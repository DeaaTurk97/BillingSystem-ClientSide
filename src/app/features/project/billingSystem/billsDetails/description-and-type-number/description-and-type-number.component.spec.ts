import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionAndTypeNumberComponent } from './description-and-type-number.component';

describe('DescriptionAndTypeNumberComponent', () => {
  let component: DescriptionAndTypeNumberComponent;
  let fixture: ComponentFixture<DescriptionAndTypeNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionAndTypeNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionAndTypeNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
