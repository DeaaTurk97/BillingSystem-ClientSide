import { DatePipe } from '@angular/common';
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ReportFilterModel } from '@app/infrastructure/models/project/reportFilterModel';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-criteria-filter',
    templateUrl: './criteria-filter.component.html',
    styleUrls: ['./criteria-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DatePipe],
})
export class CriteriaFilterComponent implements OnInit {
    @Input() public showDateRange: boolean = false;
    @Input() public model: boolean = false;

    @Output() public emitSearch = new EventEmitter<ReportFilterModel>();

    constructor(private formBuilder: FormBuilder, private datePipe: DatePipe) {}

    public frmFilter: FormGroup;

    ngOnInit(): void {
        this.ngInitialControlForm();
    }

    ngInitialControlForm() {
        this.frmFilter = this.formBuilder.group({
            fromDate: [],
            toDate: [],
            userId: [],
            groupId: [],
            serviceTypeId: [],
            countryId: [],
            countryIdExclude: [],
            phoneTypeId: [],
        });
    }

    onSearch(): void {
        this.frmFilter.value.fromDate =
            this.frmFilter.value.fromDate != null
                ? this.datePipe.transform(
                      this.frmFilter.value.fromDate,
                      'yyyy-MM-dd',
                  )
                : null;

        this.frmFilter.value.toDate =
            this.frmFilter.value.toDate != null
                ? this.datePipe.transform(
                      this.frmFilter.value.toDate,
                      'yyyy-MM-dd',
                  )
                : null;

        this.emitSearch.emit(this.frmFilter.value);
    }
}
