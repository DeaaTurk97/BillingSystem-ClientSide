import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypePhoneNumberService } from '@app/infrastructure/core/services/billingSystem/type-phone-number.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { servicesNeedApprovedModel } from '@app/infrastructure/models/project/servicesNeedApprovedModel';
import { TypePhoneNumber } from '@app/infrastructure/models/project/TypePhoneNumberModel';
import { UnDefinedNumberModel } from '@app/infrastructure/models/project/UnDefinedNumberModel';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-services-need-approval',
    templateUrl: './services-need-approval.component.html',
    styleUrls: ['./services-need-approval.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesNeedApprovalComponent implements OnInit {
    public typePhonesNumbers: TypePhoneNumber[] = [];
    displayedColumns = [
        'dialledNumber',
        'typeServiceUsedId',
        'serviceUsedName',
        'phoneName',
        'callDateTime',
        'callDuration',
        'callRetailPrice',
    ];
    dataSource: servicesNeedApprovedModel[] = this.dataRecived[
        'servicesNeedApprovedModel'
    ];
    form: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public dataRecived: UnDefinedNumberModel[],
        private dialogRef: MatDialogRef<ServicesNeedApprovalComponent>,
        private typePhoneNumberService: TypePhoneNumberService,
        private notify: NotificationService,
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.getAllTypePhonNumber();
        this.form = this.fb.group({
            unDefinedNumber: this.createFormArray(),
        });
    }

    createFormArray(): FormArray {
        return new FormArray(
            this.dataSource.map(
                (item) =>
                    new FormGroup({
                        id: new FormControl(item.id),
                        dialledNumber: new FormControl(item.dialledNumber),
                        typeServiceUsedId: new FormControl(
                            item.typeServiceUsedId,
                            Validators.required,
                        ),
                    }),
            ),
        );
    }

    getAllTypePhonNumber() {
        this.typePhoneNumberService
            .getAllTypesPhoneNumber()
            .pipe(
                map((typePhoneNumber) => {
                    this.typePhonesNumbers = typePhoneNumber;
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage('ErrorOnLoadData');
                }),
            )
            .subscribe((result) => {});
    }

    servicesNeedApproval() {
        this.typePhoneNumberService
            .ServicesSubmitted(
                this.form.controls.unDefinedNumber.value,
                Number(this.dataRecived['billId']),
            )
            .pipe(
                mergeMap((data) => {
                    if (data) {
                        return of(data);
                    }
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage('SaveFailed');
                }),
            )
            .subscribe((result) => {
                this.dialogRef.close(result);
            });
    }
}
