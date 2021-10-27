import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Renderer2,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UploadBillsLebanonService } from '@app/infrastructure/core/services/billingSystem/upload-bills-lebanon.service';
import { DocumentService } from '@app/infrastructure/core/services/documents/document.service';
import { FileService } from '@app/infrastructure/core/services/file.service';
import { FormService } from '@app/infrastructure/core/services/form.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { FileConfig } from '@app/infrastructure/models/file';
import { FormConfig, FormField } from '@app/infrastructure/models/form/form';
import { IInputField, InputField } from '@app/infrastructure/models/form/input';
import { IUploadedDocument } from '@app/infrastructure/models/uploaded-document';
import { ConfirmDialogComponent } from '@app/infrastructure/shared/components/confirm-dialog/confirm-dialog.component';
import { RequiredValidation } from '@app/infrastructure/utils/validation/required-validation';
import { UploadValidation } from '@app/infrastructure/utils/validation/upload-validation';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-upload-bills-lebanon',
    templateUrl: './upload-bills-lebanon.component.html',
    styleUrls: ['./upload-bills-lebanon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadBillsLebanonComponent implements OnInit {
    public fileConfig = new FileConfig({
        allowedFileExtensionList: ['xlsx', 'csv', 'xls'],
        allowedMimeTypeList: ['xlsx', 'csv', 'xls'],
        canUploadMultiple: true,
    });

    public isSubmitted = false;
    public billType: string = '';
    public validationMessageList: string[] = [];
    public formGroup: FormGroup;
    public formConfig = new FormConfig({
        formName: 'form',
        submit: null,
        controls: [
            new FormField<IInputField>({
                name: 'fileList',
                fieldType: 'input',
                fieldConfig: new InputField({
                    inputType: 'file',
                }),
                validation: [
                    RequiredValidation.required(),
                    UploadValidation.validateFiles(this.fileConfig),
                ],
            }),
        ],
    });

    constructor(
        private documentService: DocumentService,
        private fileService: FileService,
        private formService: FormService,
        private notify: NotificationService,
        private uploadBillsLebanonService: UploadBillsLebanonService,
        private cdr: ChangeDetectorRef,
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.formGroup = this.buildForm();
    }

    public get fileListFormControl(): AbstractControl {
        return this.formGroup.get(this.formConfig.controls[0].name);
    }

    public onFileSelect(fileList: FileList): void {
        this.validationMessageList = this.validateFiles(fileList);
        this.fileListFormControl.setValue(fileList);
    }

    private validateFiles(fileList: FileList): string[] {
        return this.fileService.buildValidationSuccessMessageList(
            fileList,
            this.fileConfig,
        );
    }

    public uploadDocument(): Observable<IUploadedDocument[]> {
        return this.documentService.uploadDocuments(
            this.fileListFormControl.value,
        );
    }

    private buildForm(): FormGroup {
        return this.formService.buildForm(this.formConfig);
    }

    ImportType() {
        if (this.billType === 'Calls' || this.billType === 'Roaming') {
            this.uploadCallsAndRoaming();
        } else if (this.billType === 'DataRoaming') {
            this.uploadDataRoaming();
        } else if (this.billType === 'Data') {
            this.uploadData();
        }
    }

    uploadCallsAndRoaming() {
        this.isSubmitted = true;
        return this.uploadDocument()
            .pipe(
                mergeMap((uploadedDocuments: IUploadedDocument[]) => {
                    return this.uploadBillsLebanonService.uploadCallsAndRoaming(
                        uploadedDocuments,
                        this.billType,
                    );
                }),
                catchError(() => of(null)),
            )
            .subscribe((result) => {
                if (result) {
                    this.notify.showTranslateMessage(
                        'FileUploadedSuccessfully',
                        false,
                    );
                } else {
                    this.notify.showTranslateMessage(
                        'FileUploadedNotSuccessfully',
                        true,
                    );
                }
                this.isSubmitted = false;
                this.cdr.detectChanges();
            });
    }

    uploadDataRoaming() {
        this.isSubmitted = true;
        return this.uploadDocument()
            .pipe(
                mergeMap((uploadedDocuments: IUploadedDocument[]) => {
                    return this.uploadBillsLebanonService.uploadDataRoaming(
                        uploadedDocuments,
                    );
                }),
                catchError(() => of(null)),
            )
            .subscribe((result) => {
                if (result) {
                    this.notify.showTranslateMessage(
                        'FileUploadedSuccessfully',
                        false,
                    );
                } else {
                    this.notify.showTranslateMessage(
                        'FileUploadedNotSuccessfully',
                        true,
                    );
                }
                this.isSubmitted = false;
                this.cdr.detectChanges();
            });
    }

    uploadData() {
        this.isSubmitted = true;
        return this.uploadDocument()
            .pipe(
                mergeMap((uploadedDocuments: IUploadedDocument[]) => {
                    return this.uploadBillsLebanonService.uploadData(
                        uploadedDocuments,
                    );
                }),
                catchError(() => of(null)),
            )
            .subscribe((result) => {
                if (result) {
                    this.notify.showTranslateMessage(
                        'FileUploadedSuccessfully',
                        false,
                    );
                } else {
                    this.notify.showTranslateMessage(
                        'FileUploadedNotSuccessfully',
                        true,
                    );
                }
                this.isSubmitted = false;
                this.cdr.detectChanges();
            });
    }

    ReminderStaff() {
        return this.dialog
            .open(ConfirmDialogComponent, {
                width: '28em',
                height: '11em',
                panelClass: 'confirm-dialog-container',
                position: { top: '5em' },
                disableClose: true,
                data: {
                    messageList: ['SureWantReminderStaff'],
                    action: 'Yes',
                    showCancel: true,
                },
            })
            .afterClosed()
            .pipe(
                switchMap((dialogResult: string) => {
                    if (dialogResult) {
                        return this.uploadBillsLebanonService.sendNotificationsAddedBills();
                    } else {
                        this.notify.showTranslateMessage('CancelDelete');
                        return of(null);
                    }
                }),
                catchError((): any => {
                    this.notify.showTranslateMessage('ErrorOnDelete');
                }),
            )
            .subscribe((result) => {
                if (result) {
                    this.notify.invokeApprovalsCycleNumbersAndBills(result);
                    this.notify.showTranslateMessage(
                        'ReminderStaffSuccessfully',
                    );
                }
            });
    }
}
