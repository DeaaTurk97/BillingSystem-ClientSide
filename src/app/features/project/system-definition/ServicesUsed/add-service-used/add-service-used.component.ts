import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceUsedService } from '@app/infrastructure/core/services/billingSystem/service-used.service';
import { ServiceUsedModel } from '@app/infrastructure/models/project/serviceUsedModel';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-add-service-used',
    templateUrl: './add-service-used.component.html',
    styleUrls: ['./add-service-used.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddServiceUsedComponent implements OnInit {
    public isInProgress = false;
    public frmAddNew: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public serviceUsedModel: ServiceUsedModel,
        private formBuilder: FormBuilder,
        private serviceUsedService: ServiceUsedService,
        private dialogRef: MatDialogRef<AddServiceUsedComponent>,
    ) {}

    get ID() {
        return this.frmAddNew.controls.Id.value;
    }

    ngOnInit(): void {
        this.ngInitialControlForm();
        this.setServiceTypeDetails();
    }

    ngInitialControlForm() {
        this.frmAddNew = this.formBuilder.group({
            Id: [0],
            ServiceUsedNameAr: ['', Validators.required],
            ServiceUsedNameEn: ['', Validators.required],
            ServicePrice: [null],
            IsCalculatedValue: [false, Validators.required],
            IsNeedApproved: [false, Validators.required],
            NonOfficial: [false, Validators.required],
        });
    }

    setServiceTypeDetails() {
        if (this.serviceUsedModel) {
            this.frmAddNew.controls.Id.setValue(this.serviceUsedModel.id);
            this.frmAddNew.controls.ServiceUsedNameAr.setValue(
                this.serviceUsedModel.serviceUsedNameAr,
            );
            this.frmAddNew.controls.ServiceUsedNameEn.setValue(
                this.serviceUsedModel.serviceUsedNameEn,
            );
            this.frmAddNew.controls.IsCalculatedValue.setValue(
                this.serviceUsedModel.isCalculatedValue,
            );
            this.frmAddNew.controls.IsNeedApproved.setValue(
                this.serviceUsedModel.isNeedApproved,
            );
            this.frmAddNew.controls.ServicePrice.setValue(
                this.serviceUsedModel.servicePrice,
            );
            this.frmAddNew.controls.NonOfficial.setValue(
                this.serviceUsedModel.nonOfficial,
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
                        ? this.serviceUsedService.addServiceUsed(
                              this.frmAddNew.value,
                          )
                        : this.serviceUsedService.updateServiceUsed(
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
