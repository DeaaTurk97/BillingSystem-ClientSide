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
import { UserService } from '@app/infrastructure/core/services/auth/user.service';
import { UserModel } from '@app/infrastructure/models/project/UserModel';
import { ExportReportService } from '@app/infrastructure/core/services/billingSystem//export-report-service';
import { CountryService } from '@app/infrastructure/core/services/billingSystem/country.service';
import { CountryModel } from '@app/infrastructure/models/project/CountryModel';
import { TypePhoneNumberService } from '@app/infrastructure/core/services/billingSystem/type-phone-number.service';
import { TypePhoneNumber } from '@app/infrastructure/models/project/TypePhoneNumberModel';
import { ServiceUsedModel } from '@app/infrastructure/models/project/serviceUsedModel';
import { ServiceUsedService } from '@app/infrastructure/core/services/billingSystem/service-used.service';

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
    public servicesUsedModel: ServiceUsedModel[] = [];
    public countryModel: CountryModel[] = [];
    public countryExcludeModel: CountryModel[] = [];
    public typePhoneNumberModel: TypePhoneNumber[] = [];
    public dataSource = new MatTableDataSource<CallDetailsModel>([]);
    constructor(
        private CallDetailsService: CallDetailsService,
        private notify: NotificationService,
        private groupService: GroupService,
        private userService: UserService,
        private serviceUsedService: ServiceUsedService,
        private countryService: CountryService,
        private typePhoneNumberService: TypePhoneNumberService,
        private exportReportService: ExportReportService,
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

    onExport(reportType: any) {
        this.reportFilterModel.reportType = reportType;
        this.exportReportService
            .exportCallDetails(this.reportFilterModel)
            .subscribe((result) => {
                window.open(result.urlPath);
            });
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
        this.serviceUsedService
            .getAllServicesUsed()
            .pipe(
                map((data) => {
                    if (data) {
                        this.servicesUsedModel = data;
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
