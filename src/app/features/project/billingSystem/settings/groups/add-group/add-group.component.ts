import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupService } from '@app/infrastructure/core/services/billingSystem/group.service';
import { GroupModel } from '@app/infrastructure/models/project/groupModel';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-add-group',
    templateUrl: './add-group.component.html',
    styleUrls: ['./add-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGroupComponent implements OnInit {
    public isInProgress = false;
    public frmAddNew: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public groupModel: GroupModel,
        private formBuilder: FormBuilder,
        private groupService: GroupService,
        private dialogRef: MatDialogRef<AddGroupComponent>,
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
            GroupNameAr: ['', Validators.required],
            GroupNameEn: ['', Validators.required],
        });
    }

    setGroupDetails() {
        if (this.groupModel) {
            this.frmAddNew.controls.Id.setValue(this.groupModel.id);
            this.frmAddNew.controls.GroupNameAr.setValue(
                this.groupModel.groupNameAr,
            );
            this.frmAddNew.controls.GroupNameEn.setValue(
                this.groupModel.groupNameEn,
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
                        ? this.groupService.addGroup(this.frmAddNew.value)
                        : this.groupService.updateGroup(this.frmAddNew.value);
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
