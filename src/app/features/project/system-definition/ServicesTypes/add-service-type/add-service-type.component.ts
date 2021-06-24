import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceTypeService } from '@app/infrastructure/core/services/billingSystem/service-type.service';
import { ServiceTypeModel } from '@app/infrastructure/models/project/serviceTypeModel';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-add-service-type',
    templateUrl: './add-service-type.component.html',
    styleUrls: ['./add-service-type.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddServiceTypeComponent implements OnInit {
    public isInProgress = false;
    public frmAddNew: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public serviceTypeModel: ServiceTypeModel,
        private formBuilder: FormBuilder,
        private serviceTypeService: ServiceTypeService,
        private dialogRef: MatDialogRef<AddServiceTypeComponent>,
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
            ServiceTypeNameAr: ['', Validators.required],
            ServiceTypeNameEn: ['', Validators.required],
            IsCalculatedValue: [false, Validators.required],
        });
    }

    setServiceTypeDetails() {
        if (this.serviceTypeModel) {
            this.frmAddNew.controls.Id.setValue(this.serviceTypeModel.id);
            this.frmAddNew.controls.ServiceTypeNameAr.setValue(
                this.serviceTypeModel.serviceTypeNameAr,
            );
            this.frmAddNew.controls.ServiceTypeNameEn.setValue(
                this.serviceTypeModel.serviceTypeNameEn,
            );
            this.frmAddNew.controls.IsCalculatedValue.setValue(
                this.serviceTypeModel.isCalculatedValue,
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
                        ? this.serviceTypeService.addServiceType(
                              this.frmAddNew.value,
                          )
                        : this.serviceTypeService.updateServiceType(
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
