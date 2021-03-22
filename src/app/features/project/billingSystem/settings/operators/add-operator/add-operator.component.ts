import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperatorService } from '@app/infrastructure/core/services/billingSystem/operator.service';
import { OperatorModel } from '@app/infrastructure/models/project/operatorModel';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-add-operator',
    templateUrl: './add-operator.component.html',
    styleUrls: ['./add-operator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOperatorComponent implements OnInit {
    public isInProgress = false;
    public frmAddNew: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public operatorModel: OperatorModel,
        private formBuilder: FormBuilder,
        private operatorService: OperatorService,
        private dialogRef: MatDialogRef<AddOperatorComponent>,
    ) {}

    get ID() {
        return this.frmAddNew.controls.Id.value;
    }

    ngOnInit(): void {
        this.ngInitialControlForm();
        this.setGroupDetails();
    }

    ngInitialControlForm() {
        this.frmAddNew = this.formBuilder.group({
            Id: [0],
            OperatorNameAr: ['', Validators.required],
            OperatorNameEn: ['', Validators.required],
            OperatorKey: ['', Validators.required],
        });
    }

    setGroupDetails() {
        if (this.operatorModel) {
            this.frmAddNew.controls.Id.setValue(this.operatorModel.id);
            this.frmAddNew.controls.OperatorNameAr.setValue(
                this.operatorModel.operatorNameAr,
            );
            this.frmAddNew.controls.OperatorNameEn.setValue(
                this.operatorModel.operatorNameEn,
            );
            this.frmAddNew.controls.OperatorKey.setValue(
                this.operatorModel.operatorKey,
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
                        ? this.operatorService.addOperator(this.frmAddNew.value)
                        : this.operatorService.updateOperator(
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
