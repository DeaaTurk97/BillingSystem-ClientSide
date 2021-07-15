import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CallDetailsService } from '@app/infrastructure/core/services/billingSystem/call-details-service';
import { TypePhoneNumberService } from '@app/infrastructure/core/services/billingSystem/type-phone-number.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { ReportFilterModel } from '@app/infrastructure/models/project/reportFilterModel';
import { TypePhoneNumber } from '@app/infrastructure/models/project/TypePhoneNumberModel';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-description-and-type-number',
    templateUrl: './description-and-type-number.component.html',
    styleUrls: ['./description-and-type-number.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionAndTypeNumberComponent implements OnInit {
    public typePhonesNumbers: TypePhoneNumber[] = [];
    public reportFilterModel: ReportFilterModel = new ReportFilterModel();

    displayedColumns = [
        'id',
        'dialledNumber',
        'callDuration',
        'callRetailPrice',
        'serviceTypeNameEn',
        'typePhoneNumberId',
        'phoneName',
    ];
    dataSource = new MatTableDataSource<any>();

    constructor(
        @Inject(MAT_DIALOG_DATA) public billId: number,
        private typePhoneNumberService: TypePhoneNumberService,
        private notify: NotificationService,
        private callDetailsService: CallDetailsService,
    ) {}

    ngOnInit(): void {
        this.getAllTypePhonNumber();
    }

    getAllTypePhonNumber() {
        debugger;
        this.reportFilterModel.pageIndex = 1;
        this.reportFilterModel.pageSize = 10000000;
        this.reportFilterModel.billId = this.billId;

        this.typePhoneNumberService
            .getAllTypesPhoneNumber()
            .pipe(
                mergeMap((data) => {
                    this.typePhonesNumbers = data;
                    return this.callDetailsService.getCallDetails(
                        this.reportFilterModel,
                    );
                }),
                map((data) => {
                    this.dataSource.data = data.dataRecord;
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage('ErrorOnLoadData');
                }),
            )
            .subscribe((result) => {});
    }

    print() {
        debugger;
        console.log(this.dataSource.data);
    }
}
