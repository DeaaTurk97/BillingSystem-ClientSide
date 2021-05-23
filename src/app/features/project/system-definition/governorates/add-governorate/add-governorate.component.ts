import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountryService } from '@app/infrastructure/core/services/billingSystem/country.service';
import { GovernorateService } from '@app/infrastructure/core/services/billingSystem/governorate.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { GovernorateModel } from '@app/infrastructure/models/project/governorate';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-add-governorate',
    templateUrl: './add-governorate.component.html',
    styleUrls: ['./add-governorate.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGovernorateComponent implements OnInit {
    public isInProgress = false;
    public frmAddNew: FormGroup;
    public countries: GovernorateModel[] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public governorateModel: GovernorateModel,
        private formBuilder: FormBuilder,
        private governorateService: GovernorateService,
        private countryService: CountryService,
        private dialogRef: MatDialogRef<AddGovernorateComponent>,
        private notify: NotificationService,
    ) {}

    get ID() {
        return this.frmAddNew.controls.Id.value;
    }

    ngOnInit(): void {
        this.ngInitialControlForm();
        this.LoadAllCountries();
        this.setGroupDetails();
    }

    ngInitialControlForm() {
        this.frmAddNew = this.formBuilder.group({
            Id: [0],
            GovernorateNameAr: ['', Validators.required],
            GovernorateNameEn: ['', Validators.required],
            CountryId: ['', Validators.required],
        });
    }

    LoadAllCountries() {
        this.countryService
            .getAllCountries()
            .pipe(
                map((countryData) => {
                    this.countries = countryData;
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage('ErrorOnLoadData');
                }),
            )
            .subscribe((result) => {});
    }

    setGroupDetails() {
        if (this.governorateModel) {
            this.frmAddNew.controls.Id.setValue(this.governorateModel.id);
            this.frmAddNew.controls.GovernorateNameAr.setValue(
                this.governorateModel.governorateNameAr,
            );
            this.frmAddNew.controls.GovernorateNameEn.setValue(
                this.governorateModel.governorateNameEn,
            );
            this.frmAddNew.controls.CountryId.setValue(
                this.governorateModel.countryId,
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
                        ? this.governorateService.addGovernorate(
                              this.frmAddNew.value,
                          )
                        : this.governorateService.updateGovernorate(
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
