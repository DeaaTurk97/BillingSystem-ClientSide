import { DatePipe } from '@angular/common';
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountryModel } from '@app/infrastructure/models/project/CountryModel';
import { GroupModel } from '@app/infrastructure/models/project/groupModel';
import { ReportFilterModel } from '@app/infrastructure/models/project/reportFilterModel';
import { ServiceTypeModel } from '@app/infrastructure/models/project/serviceTypeModel';
import { TypePhoneNumber } from '@app/infrastructure/models/project/TypePhoneNumberModel';
import { UserModel } from '@app/infrastructure/models/project/UserModel';
import { MonthsNames } from '../../Services/CommonMemmber';

@Component({
    selector: 'app-criteria-filter',
    templateUrl: './criteria-filter.component.html',
    styleUrls: ['./criteria-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DatePipe],
})
export class CriteriaFilterComponent implements OnInit {
    @Input() public showDateRange: boolean = false;
    @Input() public showGroups: boolean = false;
    @Input() public showUsers: boolean = false;
    @Input() public showServiceType: boolean = false;
    @Input() public showCountries: boolean = false;
    @Input() public showExcludeCountries: boolean = false;
    @Input() public showTypesPhoneNumber: boolean = false;
    @Input() public showIsSubmitted: boolean = false;
    @Input() public showMonthsNames: boolean = false;
    @Input() public showYearsNumbers: boolean = false;

    @Input() public groupData: GroupModel[] = [];
    @Input() public userData: UserModel[] = [];
    @Input() public serviceTypeData: ServiceTypeModel[] = [];
    @Input() public countryData: CountryModel[] = [];
    @Input() public countryExcludeData: CountryModel[] = [];
    @Input() public typesPhoneNumberData: TypePhoneNumber[] = [];

    @Input() public selectBillMonthId: number = null;
    @Input() public selectBillYearId: number = null;
    @Input() public selectUserId: number = null;

    @Output() public emitSearch = new EventEmitter<ReportFilterModel>();

    //adding this to fill drop down list years range
    public minYear = new Date().getFullYear() - 5;
    public maxYear = new Date().getFullYear() + 5;
    public years = Array(this.maxYear - this.minYear + 1)
        .fill(undefined)
        .map((_, index) => this.minYear + index);

    //Adding this to fill drop down list all months names from Enum (MonthsNames)
    monthsNames = Object.keys(MonthsNames)
        .filter((f) => !isNaN(Number(f)))
        .map((key) => MonthsNames[key]);

    constructor(private formBuilder: FormBuilder, private datePipe: DatePipe) {}

    public frmFilter: FormGroup;

    ngOnInit(): void {
        this.ngInitialControlForm();
    }

    ngInitialControlForm() {
        this.frmFilter = this.formBuilder.group({
            fromDate: [],
            toDate: [],
            groupId: [],
            userId: [this.selectUserId],
            serviceTypeId: [],
            countryId: [],
            countryIdExclude: [],
            typePhoneNumberId: [],
            isSubmitted: [],
            billMonthId: [this.selectBillMonthId],
            billYearId: [this.selectBillYearId],
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
