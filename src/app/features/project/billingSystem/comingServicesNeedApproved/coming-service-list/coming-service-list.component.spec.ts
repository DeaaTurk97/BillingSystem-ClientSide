import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComingServiceListComponent } from './coming-service-list.component';

describe('ComingServiceListComponent', () => {
  let component: ComingServiceListComponent;
  let fixture: ComponentFixture<ComingServiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComingServiceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComingServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
