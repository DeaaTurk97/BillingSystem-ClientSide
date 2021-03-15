import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseListPresentationComponent } from './case-list-presentation.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

!environment.testIntegration
    ? Logger.log('Integration skipped')
    : describe('[Integration] LoginPresentationComponent', () => {
          let component: CaseListPresentationComponent;
          let fixture: ComponentFixture<CaseListPresentationComponent>;

          beforeEach(async(() => {
              TestBed.configureTestingModule({
                  declarations: [CaseListPresentationComponent],
              }).compileComponents();
          }));

          beforeEach(() => {
              fixture = TestBed.createComponent(CaseListPresentationComponent);
              component = fixture.componentInstance;
              fixture.detectChanges();
          });

          it('should create', () => {
              expect(component).toBeTruthy();
          });
      });
