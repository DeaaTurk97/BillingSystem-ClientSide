import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComingNumbersListComponent } from './coming-numbers-list.component';

describe('IncomingNumbersComponent', () => {
    let component: ComingNumbersListComponent;
    let fixture: ComponentFixture<ComingNumbersListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ComingNumbersListComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ComingNumbersListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
