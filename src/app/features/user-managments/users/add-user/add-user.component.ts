import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '@app/infrastructure/core/services/auth/user.service';
import { GroupService } from '@app/infrastructure/core/services/billingSystem/group.service';
import { LanguagesService } from '@app/infrastructure/core/services/language/language.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { GroupModel } from '@app/infrastructure/models/project/groupModel';
import { LanguageModel } from '@app/infrastructure/models/project/LanguageModel';
import { UserModel } from '@app/infrastructure/models/project/UserModel';
import { RoleModel } from '@app/infrastructure/models/RoleModel';
import { Constants } from '@app/infrastructure/utils/constants';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent implements OnInit {
    frmAddNew: FormGroup;
    public isInProgress = false;
    public isHidePassword: boolean = true;
    public isHidePasswordConfirm: boolean = true;
    public groupsModel: GroupModel[] = [];
    public languagesModel: LanguageModel[] = [];
    public rolesModel: RoleModel[] = [];
    public passwordPattern: RegExp = Constants.patterns.DIGIT_REGEX;

    constructor(
        @Inject(MAT_DIALOG_DATA) public userModel: UserModel,
        private formBuilder: FormBuilder,
        private notify: NotificationService,
        private groupService: GroupService,
        private languageService: LanguagesService,
        private userService: UserService,
        private dialogRef: MatDialogRef<AddUserComponent>,
    ) {}

    get ID() {
        return this.frmAddNew.controls.Id.value;
    }
    get PhoneNumber() {
        return this.frmAddNew.controls.PhoneNumber.value;
    }

    ngOnInit(): void {
        this.ngInitialControlForm();
        this.loadAllData();
        this.setUserDeails();
    }

    ngInitialControlForm() {
        this.frmAddNew = this.formBuilder.group({
            Id: [0],
            UserName: [null, Validators.required],
            Email: [
                null,
                Validators.compose([Validators.required, Validators.email]),
            ],
            PhoneNumber: [null, Validators.required],
            GroupId: [null, Validators.required],
            LanguageId: [null, Validators.required],
            RoleId: [null, Validators.required],
        });
    }

    setUserDeails() {
        if (this.userModel) {
            this.frmAddNew.controls.Id.setValue(this.userModel.id);
            this.frmAddNew.controls.UserName.setValue(this.userModel.userName);

            this.frmAddNew.controls.Email.setValue(this.userModel.email);
            this.frmAddNew.controls.PhoneNumber.setValue(
                this.userModel.phoneNumber,
            );
            this.frmAddNew.controls.GroupId.setValue(this.userModel.groupId);
            this.frmAddNew.controls.LanguageId.setValue(
                this.userModel.languageId,
            );
            this.frmAddNew.controls.RoleId.setValue(this.userModel.roleId);
        }
    }

    loadAllData() {
        this.groupService
            .getAllGroups()
            .pipe(
                mergeMap((groupsData) => {
                    this.groupsModel = groupsData;
                    return this.languageService.getAllLanguages();
                }),
                mergeMap((languagesData) => {
                    this.languagesModel = languagesData;
                    return this.userService.getAllRoles();
                }),
                map((rolesData) => {
                    this.rolesModel = rolesData;
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage('ErrorOnLoadData');
                }),
            )
            .subscribe((result) => {});
    }

    onSubmit() {
        this.isInProgress = true;
        var initialObservable = of({});

        initialObservable
            .pipe(
                mergeMap(() => {
                    return this.ID === 0
                        ? this.userService.addUser(this.frmAddNew.value)
                        : this.userService.updateUser(this.frmAddNew.value);
                }),
            )
            .subscribe((id) => {
                if (id) {
                    this.dialogRef.close(this.frmAddNew.value);
                    this.frmAddNew.reset();
                }
            });
    }

    ResetControls() {
        this.frmAddNew.reset();
    }
}
