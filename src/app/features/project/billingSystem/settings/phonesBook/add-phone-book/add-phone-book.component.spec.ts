import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhoneBookComponent } from './add-phone-book.component';

describe('AddPhoneBookComponent', () => {
  let component: AddPhoneBookComponent;
  let fixture: ComponentFixture<AddPhoneBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPhoneBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhoneBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
