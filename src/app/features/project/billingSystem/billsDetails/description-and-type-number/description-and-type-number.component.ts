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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypePhoneNumberService } from '@app/infrastructure/core/services/billingSystem/type-phone-number.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { TypePhoneNumber } from '@app/infrastructure/models/project/TypePhoneNumberModel';
import { UnDefinedNumberModel } from '@app/infrastructure/models/project/UnDefinedNumberModel';
import { catchError, map } from 'rxjs/operators';

@Component({
    selector: 'app-description-and-type-number',
    templateUrl: './description-and-type-number.component.html',
    styleUrls: ['./description-and-type-number.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionAndTypeNumberComponent implements OnInit {
    public typePhonesNumbers: TypePhoneNumber[] = [];
    displayedColumns = [
        'id',
        'dialledNumber',
        'typePhoneNumberId',
        'phoneName',
    ];
    dataSource: UnDefinedNumberModel[] = this.unDefinedNumberModel;
    form: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public unDefinedNumberModel: UnDefinedNumberModel[],
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
                        dialledNumber: new FormControl(item.dialledNumber),
                        typePhoneNumberId: new FormControl(
                            item.typePhoneNumberId,
                            Validators.required,
                        ),
                        phoneName: new FormControl(null, Validators.required),
                    }),
            ),
        );
    }

    getAllTypePhonNumber() {
        this.typePhoneNumberService
            .getAllTypesPhoneNumber()
            .pipe(
                map((data) => {
                    this.typePhonesNumbers = data;
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage('ErrorOnLoadData');
                }),
            )
            .subscribe((result) => {});
    }

    addingNewNumbers() {
        this.typePhoneNumberService
            .addingNewNumbers(this.form.controls.unDefinedNumber.value)
            .pipe(
                map((data) => {
                    if (data) {
                        this.notify.showTranslateMessage('UpdatedSuccessfully');
                    }
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage('SaveFailed');
                }),
            )
            .subscribe((result) => {});
    }
}
