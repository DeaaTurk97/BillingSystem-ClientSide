import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobModel } from '@models/project/JobModel';
import { MatDialogRef } from '@angular/material/dialog';
import { JobsService } from '@app/infrastructure/core/services/billingSystem/job.service';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'app-add-job',
    templateUrl: './add-job.component.html',
    styleUrls: ['./add-job.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddJobComponent implements OnInit {
    frmAddNew: FormGroup;
    public isInProgress = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public jobModel: JobModel,
        private formBuilder: FormBuilder,
        private jobsService: JobsService,
        private dialogRef: MatDialogRef<AddJobComponent>,
    ) {}

    get ID() {
        return this.frmAddNew.controls.Id.value;
    }

    ngOnInit(): void {
        this.ngInitialControlForm();
        this.setJobDetails();
    }

    ngInitialControlForm() {
        this.frmAddNew = this.formBuilder.group({
            Id: [0],
            JobNameAr: ['', Validators.required],
            JobNameEn: ['', Validators.required],
        });
    }

    setJobDetails() {
        if (this.jobModel) {
            this.frmAddNew.controls.Id.setValue(this.jobModel.id);
            this.frmAddNew.controls.JobNameAr.setValue(this.jobModel.jobNameAr);
            this.frmAddNew.controls.JobNameEn.setValue(this.jobModel.jobNameEn);
        }
    }

    onSubmit() {
        this.isInProgress = true;

        var initialObservable = of({});
        initialObservable
            .pipe(
                mergeMap(() => {
                    return this.ID === 0
                        ? this.jobsService.addJob(this.frmAddNew.value)
                        : this.jobsService.updateJob(this.frmAddNew.value);
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
