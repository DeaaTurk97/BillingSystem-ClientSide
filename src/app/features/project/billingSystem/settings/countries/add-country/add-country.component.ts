import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountryService } from '@app/infrastructure/core/services/billingSystem/country.service';
import { CountryModel } from '@app/infrastructure/models/project/CountryModel';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-add-country',
    templateUrl: './add-country.component.html',
    styleUrls: ['./add-country.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCountryComponent implements OnInit {
    public isInProgress = false;
    public frmAddNew: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public countryModel: CountryModel,
        private formBuilder: FormBuilder,
        private countryService: CountryService,
        private dialogRef: MatDialogRef<AddCountryComponent>,
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
            CountryNameAr: ['', Validators.required],
            CountryNameEn: ['', Validators.required],
            CountryKey: ['', Validators.required],
            PricePerMinute: ['', Validators.required],
        });
    }

    setCountryDetails() {
        if (this.countryModel) {
            this.frmAddNew.controls.Id.setValue(this.countryModel.id);
            this.frmAddNew.controls.CountryNameAr.setValue(
                this.countryModel.countryNameAr,
            );
            this.frmAddNew.controls.CountryNameEn.setValue(
                this.countryModel.countryNameEn,
            );
            this.frmAddNew.controls.CountryKey.setValue(
                this.countryModel.countryKey,
            );
            this.frmAddNew.controls.PricePerMinute.setValue(
                this.countryModel.pricePerMinute,
            );
        }
    }

    onSubmit() {
        this.isInProgress = true;

        var initialObservable = of({});
        initialObservable
            .pipe(
                mergeMap(() => {
                    return this.ID === 0
                        ? this.countryService.addCountry(this.frmAddNew.value)
                        : this.countryService.updateCountry(
                              this.frmAddNew.value,
                          );
                }),
            )
            .subscribe((id) => {
                if (id) {
                    this.dialogRef.close(this.frmAddNew.value);
                    this.frmAddNew.reset();
                }
            });
    }

    resetFormBuilder() {
        this.frmAddNew.reset();
        this.isInProgress = false;
    }
}
