import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhoneBookService } from '@app/infrastructure/core/services/billingSystem/phone-book.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { PhoneBookModel } from '@app/infrastructure/models/project/phoneBook';
import {
    StatusCycleBills,
    TypePhonesNumber,
} from '@app/infrastructure/models/SystemEnum';
import { ResultActions } from '@app/infrastructure/shared/Services/CommonMemmber';
import { of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-add-phone-book',
    templateUrl: './add-phone-book.component.html',
    styleUrls: ['./add-phone-book.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPhoneBookComponent implements OnInit {
    public isInProgress = false;
    public frmAddNew: FormGroup;

    keys = Object.keys;
    typePhonesNumber = Object.keys(TypePhonesNumber)
        .filter((f) => !isNaN(Number(f)))
        .map((key) => TypePhonesNumber[key]);
    selectedTypeNumber = 1;

    statusCycleBills = Object.keys(StatusCycleBills)
        .filter((f) => !isNaN(Number(f)))
        .map((key) => StatusCycleBills[key]);
    selectedStatusNumber = 3;

    constructor(
        @Inject(MAT_DIALOG_DATA) public phoneBookModel: PhoneBookModel,
        private formBuilder: FormBuilder,
        private phoneBookService: PhoneBookService,
        private dialogRef: MatDialogRef<AddPhoneBookComponent>,
        private notify: NotificationService,
    ) {}

    get ID() {
        return this.frmAddNew.controls.Id.value;
    }

    ngOnInit(): void {
        this.ngInitialControlForm();
        this.setCountryDetails();
    }

    ngInitialControlForm() {
        this.frmAddNew = this.formBuilder.group({
            Id: [0],
            PhoneNumber: ['', Validators.required],
            PhoneName: ['', Validators.required],
            TypePhoneNumberId: [this.selectedTypeNumber, Validators.required],
            statusNumberId: [this.selectedStatusNumber, Validators.required],
        });
    }

    setCountryDetails() {
        if (this.phoneBookModel) {
            this.frmAddNew.controls.Id.setValue(this.phoneBookModel.id);
            this.frmAddNew.controls.PhoneNumber.setValue(
                this.phoneBookModel.phoneNumber,
            );
            this.frmAddNew.controls.PhoneName.setValue(
                this.phoneBookModel.phoneName,
            );
            this.frmAddNew.controls.TypePhoneNumberId.setValue(
                this.phoneBookModel.typePhoneNumberId,
            );
            this.frmAddNew.controls.statusNumberId.setValue(
                this.phoneBookModel.statusNumberId,
            );
        }
    }

    onAdd() {
        this.isInProgress = true;

        this.phoneBookService
            .isNumberAdded(this.frmAddNew.controls.PhoneNumber.value)
            .pipe(
                mergeMap((data) => {
                    if (!data) {
                        return this.phoneBookService.addPhoneBook(
                            this.frmAddNew.value,
                        );
                    } else {
                        this.dialogRef.close(ResultActions.AlreadyExist);
                        return of(false);
                    }
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage('ErrorAdded');
                }),
            )
            .subscribe((result) => {
                if (result) {
                    this.dialogRef.close(ResultActions.Added);
                }
                this.resetFormBuilder();
            });
    }

    onEdit() {
        this.isInProgress = true;
        this.phoneBookService
            .updatePhoneBook(this.frmAddNew.value)
            .pipe(
                mergeMap((data) => {
                    return of(data);
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage('ErrorUpdate');
                }),
            )
            .subscribe((result) => {
                this.dialogRef.close(ResultActions.Updated);
                this.resetFormBuilder();
            });
    }

    resetFormBuilder() {
        this.frmAddNew.reset();
        this.isInProgress = false;
    }
}
