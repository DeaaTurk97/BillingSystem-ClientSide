import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ViewChild,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CallDetailsService } from '@app/infrastructure/core/services/billingSystem/call-details-service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { ReportFilterModel } from '@app/infrastructure/models/project/reportFilterModel';
import { CallDetailsModel } from '@app/infrastructure/models/project/callDetailsModel';
import { GroupModel } from '@app/infrastructure/models/project/groupModel';
import {
    ActionRowGrid,
    State,
} from '@app/infrastructure/shared/Services/CommonMemmber';
import { catchError, map } from 'rxjs/operators';
import { GroupService } from '@app/infrastructure/core/services/billingSystem/group.service';
import { ThrowStmt } from '@angular/compiler';
import { UserService } from '@app/infrastructure/core/services/auth/user.service';
import { UserModel } from '@app/infrastructure/models/project/UserModel';
import { ServiceTypeService } from '@app/infrastructure/core/services/billingSystem/service-type.service';
import { ServiceTypeModel } from '@app/infrastructure/models/project/serviceTypeModel';
import { CountryService } from '@app/infrastructure/core/services/billingSystem/country.service';
import { CountryModel } from '@app/infrastructure/models/project/CountryModel';
import { TypePhoneNumberService } from '@app/infrastructure/core/services/billingSystem/type-phone-number.service';
import { TypePhoneNumber } from '@app/infrastructure/models/project/TypePhoneNumberModel';

@Component({
    selector: 'app-calls-details-report-list',
    templateUrl: './calls-details-report-list.component.html',
    styleUrls: ['./calls-details-report-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallsDetailsReportListComponent implements OnInit {
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    public paginationIndex = 0;
    public pageIndex = 1;
    public pageSize = 10;
    public length = 0;
    public reportFilterModel: ReportFilterModel = new ReportFilterModel();
    public groupsModel: GroupModel[] = [];
    public usersModel: UserModel[] = [];
    public serviceTypesModel: ServiceTypeModel[] = [];
    public countryModel: CountryModel[] = [];
    public countryExcludeModel: CountryModel[] = [];
    public typePhoneNumberModel: TypePhoneNumber[] = [];
    public dataSource = new MatTableDataSource<CallDetailsModel>([]);
    constructor(
        private CallDetailsService: CallDetailsService,
        private notify: NotificationService,
        private groupService: GroupService,
        private userService: UserService,
        private serviceTypeService: ServiceTypeService,
        private countryService: CountryService,
        private typePhoneNumberService: TypePhoneNumberService,
    ) {}

    ngOnInit(): void {
        this.LoadReport();
        this.LoadGroups();
        this.LoadUsers();
        this.LoadServiceTypes();
        this.LoadCountries();
        //this.LoadExcludeCountries();
        this.LoadTypePhonNumber();
    }

    onActionRowGrid(ActionGrid: ActionRowGrid) {
        switch (ActionGrid.type) {
            case State.Pagination:
                this.pageSize = ActionGrid.row.pageSize;
                this.pageIndex = ActionGrid.row.pageIndex;
                this.LoadReport();
                break;
        }
    }

    onSearch(model: any) {
        this.reportFilterModel = model;
        this.LoadReport();
    }

    LoadReport() {
        this.reportFilterModel.pageSize = this.pageSize;
        this.reportFilterModel.pageIndex = this.pageIndex;
        this.CallDetailsService.getCallDetails(this.reportFilterModel)
            .pipe(
                map((paginationRecord) => {
                    this.dataSource.data = paginationRecord.dataRecord;
                    this.length = paginationRecord.countRecord;
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage('ErrorOnLoadData');
                }),
            )
            .subscribe((result) => {});
    }

    LoadGroups() {
        this.groupService
            .getGroupsByUser()
            .pipe(
                map((data) => {
                    if (data) {
                        this.groupsModel = data;
                    }
                }),
            )
            .subscribe((result) => {});
    }

    LoadUsers() {
        this.userService
            .getUsersByCurrentRole()
            .pipe(
                map((data) => {
                    if (data) {
                        this.usersModel = data;
                    }
                }),
            )
            .subscribe((result) => {});
    }

    LoadServiceTypes() {
        this.serviceTypeService
            .getAllServicesTypes()
            .pipe(
                map((data) => {
                    if (data) {
                        this.serviceTypesModel = data;
                    }
                }),
            )
            .subscribe((result) => {});
    }

    LoadCountries() {
        this.countryService
            .getAllCountries()
            .pipe(
                map((data) => {
                    if (data) {
                        this.countryModel = data;
                    }
                }),
            )
            .subscribe((result) => {});
    }

    LoadExcludeCountries() {
        this.countryService
            .getAllCountries()
            .pipe(
                map((data) => {
                    if (data) {
                        this.countryExcludeModel = data;
                    }
                }),
            )
            .subscribe((result) => {});
    }

    LoadTypePhonNumber() {
        this.typePhoneNumberService
            .getAllTypesPhoneNumber()
            .pipe(
                map((data) => {
                    this.typePhoneNumberModel = data;
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage('ErrorOnLoadData');
                }),
            )
            .subscribe((result) => {});
    }
}
