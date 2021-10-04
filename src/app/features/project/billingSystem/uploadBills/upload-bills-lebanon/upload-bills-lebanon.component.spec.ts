import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBillsLebanonComponent } from './upload-bills-lebanon.component';

describe('UploadBillsLebanonComponent', () => {
  let component: UploadBillsLebanonComponent;
  let fixture: ComponentFixture<UploadBillsLebanonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadBillsLebanonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBillsLebanonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
