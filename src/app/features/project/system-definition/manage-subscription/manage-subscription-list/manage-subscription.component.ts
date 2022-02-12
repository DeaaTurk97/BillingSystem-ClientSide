import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ManageSubscriptionService } from '@app/infrastructure/core/services/billingSystem/manage-subscription.service';
import { UserModel } from '@app/infrastructure/models/project/UserModel';
import { HistoryComponent } from '../history/history.component';

@Component({
    selector: 'app-manage-subscription',
    templateUrl: './manage-subscription.component.html',
    styleUrls: ['./manage-subscription.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageSubscriptionComponent implements OnInit {
    public user: UserModel;
    public pageIndex = 1;
    public pageSize = 10;
    public name = '';
    public usersForm: FormGroup;
    public historyForm: FormGroup;
    public Id;

    constructor(
        private dialog: MatDialog,
        private manageSvc: ManageSubscriptionService,
        private formBuilder: FormBuilder,
    ) {}

    getConfigDialog(data, isAddGridHeader?: boolean): MatDialogConfig {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.position = { top: '80px' };
        dialogConfig.width = '95%';
        dialogConfig.data = data;
        (dialogConfig.autoFocus = false), (dialogConfig.maxHeight = '90vh');
        return dialogConfig;
    }

    ngOnInit() {
        this.initHistoryForm();
        this.InitUpdateUserNameForm();
        if (this.user === undefined) {
            this.user = null;
        }
    }

    openHistory(data) {
        const dialog = this.dialog.open(
            HistoryComponent,
            this.getConfigDialog(data),
        );
    }

    initHistoryForm() {
        this.historyForm = this.formBuilder.group({
            Id: [0],
            UserName: [''],
            EffectiveDate: [''],
            OldUserName: ['', null],
            PhoneNumber: [''],
        });
    }

    InitUpdateUserNameForm() {
        this.usersForm = this.formBuilder.group({
            Id: [0],
            UserName: ['', Validators.required],
            EffectiveDate: [null],
            OldUserName: ['', null],
            PhoneNumber: [''],
        });
    }

    patchFormValue() {
        this.usersForm.patchValue({
            Id: this.user.id,
            PhoneNumber: this.user.phoneNumber,
            OldUserName: this.user.userName,
        });
    }

    PhoneNumber(phoneNumber) {
        this.manageSvc.getUserByPhoneNumber(phoneNumber).subscribe((result) => {
            this.user = result;
            this.name = this.user?.userName || '';
            this.Id = this.user?.id;
            this.patchFormValue();
        });
    }

    Update() {
        this.manageSvc
            .updateUserName(this.usersForm.value)
            .subscribe((result) => {});
        this.addHistory();
    }

    addHistory() {
        this.usersForm.patchValue({
            Id: 0,
        });
        this.manageSvc
            .addHistroy(this.usersForm.value)
            .subscribe((result) => {});
    }

    getHistoriesByPhoneNumber() {
        const phoneNumber = this.user.phoneNumber;
        this.manageSvc
            .getHistoriesByPhoneNumber(phoneNumber)
            .subscribe((result) => {
                this.openHistory(result);
            });
    }
}
