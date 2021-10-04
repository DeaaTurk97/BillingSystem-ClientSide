import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { UploadBillsService } from '@app/infrastructure/core/services/billingSystem/upload-bills.service';
import { DocumentService } from '@app/infrastructure/core/services/documents/document.service';
import { FileService } from '@app/infrastructure/core/services/file.service';
import { FormService } from '@app/infrastructure/core/services/form.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { FileConfig } from '@app/infrastructure/models/file';
import { FormConfig, FormField } from '@app/infrastructure/models/form/form';
import { IInputField, InputField } from '@app/infrastructure/models/form/input';
import { IUploadedDocument } from '@app/infrastructure/models/uploaded-document';
import { RequiredValidation } from '@app/infrastructure/utils/validation/required-validation';
import { UploadValidation } from '@app/infrastructure/utils/validation/upload-validation';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

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
    public IsMTNBills: boolean = true;
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
        private uploadBillsService: UploadBillsService,
        private cdr: ChangeDetectorRef,
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

    uploadBill() {
        this.isSubmitted = true;
        return this.uploadDocument()
            .pipe(
                mergeMap((uploadedDocuments: IUploadedDocument[]) => {
                    return this.IsMTNBills
                        ? this.uploadBillsService.uploadMTNBills(
                              uploadedDocuments,
                          )
                        : this.uploadBillsService.uploadSyriaTelBills(
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
                    //To send notifications for all users hase uploded bills
                    this.notify.invokeApprovalsCycleNumbersAndBills(result);
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
}
