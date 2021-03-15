import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { State } from '../../Services/CommonMemmber';

@Component({
    selector: 'app-user-edit-control',
    templateUrl: './user-edit-control.component.html',
    styleUrls: ['./user-edit-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditControlComponent implements OnInit {
    UserEditControl: FormGroup;

    @Input() SearchPlaceHolder: string;
    @Output() notify: EventEmitter<State> = new EventEmitter<State>();
    @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();
    @Input() IsShowAddButton = true;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.UserEditControl = this.formBuilder.group({
            searchInput: [''],
        });
    }

    clear(searchFilter) {
        this.UserEditControl.reset();
        this.applyFilter(searchFilter.target.value);
    }

    onAddClick() {
        this.notify.emit(State.Add);
    }

    onPrintClick(isAllData: boolean) {
        if (isAllData) {
            this.notify.emit(State.PrintAll);
        } else {
            this.notify.emit(State.Print);
        }
    }

    onExcelClick(isAllData: boolean) {
        if (isAllData) {
            this.notify.emit(State.ExcelAll);
        } else {
            this.notify.emit(State.Excel);
        }
    }

    onKeyUpEnterFilter(searchFilter) {
        setTimeout(() => this.searchChange.emit(searchFilter.target.value));
    }

    applyFilter(searchFilter: string) {
        if (searchFilter) {
            if (searchFilter.length === 0) {
                setTimeout(() => this.searchChange.emit(searchFilter));
            }
        } else {
            setTimeout(() => this.searchChange.emit(''));
        }
    }
}
