import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralSettingsService } from '@app/infrastructure/core/services/general-settings.service';
import { GeneralSettingsModel } from '@models/project/general-settings';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { Constants } from '@app/infrastructure/utils/constants';
import { TypePhoneNumber } from '@app/infrastructure/models/project/TypePhoneNumberModel';
import { TypePhoneNumberService } from '@app/infrastructure/core/services/billingSystem/type-phone-number.service';

@Component({
    templateUrl: './general-settings.component.html',
    styleUrls: ['./general-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralSettingsComponent implements OnInit {
    public isInProgress = false;
    public frmGeneralSettings: FormGroup;
    public isHidePassword: boolean = true;
    public typePhonesNumbers: TypePhoneNumber[] = [];
    public passwordPattern: RegExp = Constants.patterns.PASSWORD_REGEX;

    constructor(
        private generalSettingsService: GeneralSettingsService,
        private notify: NotificationService,
        private formBuilder: FormBuilder,
        private typePhoneNumberService: TypePhoneNumberService,
    ) {}

    public ngOnInit(): void {
        this.ngInitialControlForm();
        this.getGeneralSettingsInfo();
    }

    ngInitialControlForm() {
        this.frmGeneralSettings = this.formBuilder.group({
            Id: [0],
            TypePhoneNumberId: ['', Validators.required],
            DefaultPassword: ['', Validators.required],
            ValueOfAllowedCallsToTheEmployee: ['', Validators.required],
            TheNumberOfDaysGrantedToTheEmployeeToSendTheBill: [
                '',
                Validators.required,
            ],
            FractionNumbers: ['', Validators.required],
            IsDefaultPassword: [false, Validators.required],
            IsSendPasswordByEmail: [false, Validators.required],
            IsViewCallsThatHaveApriceEqualZero: [false, Validators.required],
            IsAbilityOfTheAdministratorToControlEmployeeBills: [
                false,
                Validators.required,
            ],
            IsReminderByEmail: [false, Validators.required],
            IsReminderBySystem: [false, Validators.required],

            ImportCC: ['', [Validators.email]],
            ImportSubject: ['', Validators.required],
            ImportBody: ['', Validators.required],

            ReminderIdentifyNewNumbersCC: ['', [Validators.email]],
            ReminderIdentifyNewNumbersSubject: ['', Validators.required],
            ReminderIdentifyNewNumbersBody: ['', Validators.required],

            RejectionNumberCC: ['', [Validators.email]],
            RejectionNumberSubject: ['', Validators.required],
            RejectionNumberBody: ['', Validators.required],

            PaidCC: ['', [Validators.email]],
            PaidSubject: ['', Validators.required],
            PaidBody: ['', Validators.required],

            UnPaidCC: ['', [Validators.email]],
            UnPaidSubject: ['', Validators.required],
            UnPaidBody: ['', Validators.required],

            SubmittedCC: ['', [Validators.email]],
            SubmittedSubject: ['', Validators.required],
            SubmittedBody: ['', Validators.required],

            ReminderTotalDueCC: ['', [Validators.email]],
            ReminderTotalDueSubject: ['', Validators.required],
            ReminderTotalDueBody: ['', Validators.required],

            ReminderStartPeriodSubmittBillCC: ['', [Validators.email]],
            ReminderStartPeriodSubmittBillSubject: ['', Validators.required],
            ReminderStartPeriodSubmittBillBody: ['', Validators.required],

            ReminderEndPeriodSubmittBillCC: ['', [Validators.email]],
            ReminderEndPeriodSubmittBillSubject: ['', Validators.required],
            ReminderEndPeriodSubmittBillBody: ['', Validators.required],

            EmailTestCC: ['', [Validators.email]],
            EmailTestSubject: ['', Validators.required],
            EmailTestBody: ['', Validators.required],

            NewServiceAddedCC: ['', [Validators.email]],
            NewServiceAddedSubject: ['', Validators.required],
            NewServiceAddedBody: ['', Validators.required],

            ServiceRemovedCC: ['', [Validators.email]],
            ServiceRemovedSubject: ['', Validators.required],
            ServiceRemovedBody: ['', Validators.required],

            ServicePriceGraterThanServicePlanCC: ['', [Validators.email]],
            ServicePriceGraterThanServicePlanSubject: ['', Validators.required],
            ServicePriceGraterThanServicePlanBody: ['', Validators.required],

            SMTPServer: ['', Validators.required],
            SMTPUserEmail: ['', [Validators.required, Validators.email]],
            SMTPUserPassword: ['', Validators.required],
            SMTPPortNo: ['', Validators.required],
            IsUseSSL: [false, Validators.required],
            IsRequiresAuthentication: [false, Validators.required],
            EmailForTest: ['', [Validators.required, Validators.email]],
            DisplayNameEmail: ['', Validators.required],
            IsDeleteFreeTypeNumber: [false, Validators.required],
            TaxAmount: [''],
            IsAutomatedApprovalBills: [false, Validators.required],
            IsAutomatedApprovalServices: [false, Validators.required],
            IsAutomatedApprovalPhoneNumbers: [false, Validators.required],
            IsJoinEmployeesWithLimitValue: [false, Validators.required],
        });
    }

    public generalSettingsListCurrent: GeneralSettingsModel[] = [];
    public generalSettingsListNew: GeneralSettingsModel[] = [];

    public getGeneralSettingsInfo() {
        this.typePhoneNumberService
            .getAllTypesPhoneNumber()
            .pipe(
                switchMap((typeNumber: TypePhoneNumber[]) => {
                    this.typePhonesNumbers = typeNumber;
                    return this.generalSettingsService.getGeneralSettings();
                }),
                map((generalSettings: GeneralSettingsModel[]) => {
                    if (generalSettings) {
                        this.frmGeneralSettings.controls.TypePhoneNumberId.setValue(
                            Number(
                                generalSettings.find(
                                    (generalSetting: GeneralSettingsModel) =>
                                        generalSetting.settingName ===
                                        Constants.TypePhoneNumberId,
                                )?.settingValue,
                            ),
                        );

                        this.frmGeneralSettings.controls.DefaultPassword.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.DefaultPassword,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ValueOfAllowedCallsToTheEmployee.setValue(
                            Number(
                                generalSettings.find(
                                    (generalSetting: GeneralSettingsModel) =>
                                        generalSetting.settingName ===
                                        Constants.ValueOfAllowedCallsToTheEmployee,
                                )?.settingValue,
                            ),
                        );

                        this.frmGeneralSettings.controls.TheNumberOfDaysGrantedToTheEmployeeToSendTheBill.setValue(
                            Number(
                                generalSettings.find(
                                    (generalSetting: GeneralSettingsModel) =>
                                        generalSetting.settingName ===
                                        Constants.TheNumberOfDaysGrantedToTheEmployeeToSendTheBill,
                                )?.settingValue,
                            ),
                        );

                        this.frmGeneralSettings.controls.FractionNumbers.setValue(
                            Number(
                                generalSettings.find(
                                    (generalSetting: GeneralSettingsModel) =>
                                        generalSetting.settingName ===
                                        Constants.FractionNumbers,
                                )?.settingValue,
                            ),
                        );

                        this.frmGeneralSettings.controls.IsDefaultPassword.setValue(
                            Boolean(
                                JSON.parse(
                                    generalSettings.find(
                                        (
                                            generalSetting: GeneralSettingsModel,
                                        ) =>
                                            generalSetting.settingName ===
                                            Constants.IsDefaultPassword,
                                    )?.settingValue ?? 'false',
                                ),
                            ),
                        );

                        this.frmGeneralSettings.controls.IsSendPasswordByEmail.setValue(
                            Boolean(
                                JSON.parse(
                                    generalSettings.find(
                                        (
                                            generalSetting: GeneralSettingsModel,
                                        ) =>
                                            generalSetting.settingName ===
                                            Constants.IsSendPasswordByEmail,
                                    )?.settingValue ?? 'false',
                                ),
                            ),
                        );

                        this.frmGeneralSettings.controls.IsViewCallsThatHaveApriceEqualZero.setValue(
                            Boolean(
                                JSON.parse(
                                    generalSettings.find(
                                        (
                                            generalSetting: GeneralSettingsModel,
                                        ) =>
                                            generalSetting.settingName ===
                                            Constants.IsViewCallsThatHaveApriceEqualZero,
                                    )?.settingValue ?? 'false',
                                ),
                            ),
                        );

                        this.frmGeneralSettings.controls.IsAbilityOfTheAdministratorToControlEmployeeBills.setValue(
                            Boolean(
                                JSON.parse(
                                    generalSettings.find(
                                        (
                                            generalSetting: GeneralSettingsModel,
                                        ) =>
                                            generalSetting.settingName ===
                                            Constants.IsAbilityOfTheAdministratorToControlEmployeeBills,
                                    )?.settingValue ?? 'false',
                                ),
                            ),
                        );

                        this.frmGeneralSettings.controls.IsReminderByEmail.setValue(
                            Boolean(
                                JSON.parse(
                                    generalSettings.find(
                                        (
                                            generalSetting: GeneralSettingsModel,
                                        ) =>
                                            generalSetting.settingName ===
                                            Constants.IsReminderByEmail,
                                    )?.settingValue ?? 'false',
                                ),
                            ),
                        );

                        this.frmGeneralSettings.controls.IsReminderBySystem.setValue(
                            Boolean(
                                JSON.parse(
                                    generalSettings.find(
                                        (
                                            generalSetting: GeneralSettingsModel,
                                        ) =>
                                            generalSetting.settingName ===
                                            Constants.IsReminderBySystem,
                                    )?.settingValue ?? 'false',
                                ),
                            ),
                        );

                        this.frmGeneralSettings.controls.SMTPServer.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.SMTPServer,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.SMTPUserEmail.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.SMTPUserEmail,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.SMTPUserPassword.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.SMTPUserPassword,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.SMTPPortNo.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.SMTPPortNo,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.IsUseSSL.setValue(
                            Boolean(
                                JSON.parse(
                                    generalSettings.find(
                                        (
                                            generalSetting: GeneralSettingsModel,
                                        ) =>
                                            generalSetting.settingName ===
                                            Constants.IsUseSSL,
                                    )?.settingValue ?? 'false',
                                ),
                            ),
                        );

                        this.frmGeneralSettings.controls.IsRequiresAuthentication.setValue(
                            Boolean(
                                JSON.parse(
                                    generalSettings.find(
                                        (
                                            generalSetting: GeneralSettingsModel,
                                        ) =>
                                            generalSetting.settingName ===
                                            Constants.IsRequiresAuthentication,
                                    )?.settingValue ?? 'false',
                                ),
                            ),
                        );

                        this.frmGeneralSettings.controls.EmailForTest.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.EmailForTest,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ImportCC.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ImportCC,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ImportSubject.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ImportSubject,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ImportBody.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ImportBody,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ReminderIdentifyNewNumbersCC.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ReminderIdentifyNewNumbersCC,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ReminderIdentifyNewNumbersSubject.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ReminderIdentifyNewNumbersSubject,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ReminderIdentifyNewNumbersBody.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ReminderIdentifyNewNumbersBody,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.RejectionNumberCC.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.RejectionNumberCC,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.RejectionNumberSubject.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.RejectionNumberSubject,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.RejectionNumberBody.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.RejectionNumberBody,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.PaidCC.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.PaidCC,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.PaidSubject.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.PaidSubject,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.PaidBody.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.PaidBody,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.UnPaidCC.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.UnPaidCC,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.UnPaidSubject.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.UnPaidSubject,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.UnPaidBody.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.UnPaidBody,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.SubmittedCC.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.SubmittedCC,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.SubmittedSubject.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.SubmittedSubject,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.SubmittedBody.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.SubmittedBody,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ReminderTotalDueCC.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ReminderTotalDueCC,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ReminderTotalDueSubject.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ReminderTotalDueSubject,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ReminderTotalDueBody.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ReminderTotalDueBody,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ReminderStartPeriodSubmittBillCC.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ReminderStartPeriodSubmittBillCC,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ReminderStartPeriodSubmittBillSubject.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ReminderStartPeriodSubmittBillSubject,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ReminderStartPeriodSubmittBillBody.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ReminderStartPeriodSubmittBillBody,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ReminderEndPeriodSubmittBillCC.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ReminderEndPeriodSubmittBillCC,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ReminderEndPeriodSubmittBillSubject.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ReminderEndPeriodSubmittBillSubject,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ReminderEndPeriodSubmittBillBody.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ReminderEndPeriodSubmittBillBody,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.EmailTestCC.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.EmailTestCC,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.EmailTestSubject.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.EmailTestSubject,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.EmailTestBody.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.EmailTestBody,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.NewServiceAddedCC.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.NewServiceAddedCC,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.NewServiceAddedSubject.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.NewServiceAddedSubject,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.NewServiceAddedBody.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.NewServiceAddedBody,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ServiceRemovedCC.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ServiceRemovedCC,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ServiceRemovedSubject.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ServiceRemovedSubject,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ServiceRemovedBody.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ServiceRemovedBody,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ServicePriceGraterThanServicePlanCC.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ServicePriceGraterThanServicePlanCC,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ServicePriceGraterThanServicePlanSubject.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ServicePriceGraterThanServicePlanSubject,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.ServicePriceGraterThanServicePlanBody.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.ServicePriceGraterThanServicePlanBody,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.DisplayNameEmail.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.DisplayNameEmail,
                            )?.settingValue,
                        );

                        this.frmGeneralSettings.controls.IsDeleteFreeTypeNumber.setValue(
                            Boolean(
                                JSON.parse(
                                    generalSettings.find(
                                        (
                                            generalSetting: GeneralSettingsModel,
                                        ) =>
                                            generalSetting.settingName ===
                                            Constants.IsDeleteFreeTypeNumber,
                                    )?.settingValue ?? 'false',
                                ),
                            ),
                        );

                        this.frmGeneralSettings.controls.TaxAmount.setValue(
                            generalSettings.find(
                                (generalSetting: GeneralSettingsModel) =>
                                    generalSetting.settingName ===
                                    Constants.TaxAmount,
                            )?.settingValue ?? '0',
                        );

                        this.frmGeneralSettings.controls.IsAutomatedApprovalBills.setValue(
                            Boolean(
                                JSON.parse(
                                    generalSettings.find(
                                        (
                                            generalSetting: GeneralSettingsModel,
                                        ) =>
                                            generalSetting.settingName ===
                                            Constants.IsAutomatedApprovalBills,
                                    )?.settingValue ?? 'false',
                                ),
                            ),
                        );

                        this.frmGeneralSettings.controls.IsAutomatedApprovalServices.setValue(
                            Boolean(
                                JSON.parse(
                                    generalSettings.find(
                                        (
                                            generalSetting: GeneralSettingsModel,
                                        ) =>
                                            generalSetting.settingName ===
                                            Constants.IsAutomatedApprovalServices,
                                    )?.settingValue ?? 'false',
                                ),
                            ),
                        );
                        this.frmGeneralSettings.controls.IsAutomatedApprovalPhoneNumbers.setValue(
                            Boolean(
                                JSON.parse(
                                    generalSettings.find(
                                        (
                                            generalSetting: GeneralSettingsModel,
                                        ) =>
                                            generalSetting.settingName ===
                                            Constants.IsAutomatedApprovalPhoneNumbers,
                                    )?.settingValue ?? 'false',
                                ),
                            ),
                        );

                        this.frmGeneralSettings.controls.IsJoinEmployeesWithLimitValue.setValue(
                            Boolean(
                                JSON.parse(
                                    generalSettings.find(
                                        (
                                            generalSetting: GeneralSettingsModel,
                                        ) =>
                                            generalSetting.settingName ===
                                            Constants.IsJoinEmployeesWithLimitValue,
                                    )?.settingValue ?? 'false',
                                ),
                            ),
                        );
                    }
                    this.generalSettingsListCurrent = generalSettings;
                    return this.typePhoneNumberService.getAllTypesPhoneNumber();
                }),
            )
            .subscribe((result) => {});
    }

    public saveSettings() {
        let generalSettingsModel: GeneralSettingsModel = new GeneralSettingsModel();
        this.generalSettingsListNew = [];
        if (this.frmGeneralSettings.value) {
            (generalSettingsModel.settingName = Constants.TypePhoneNumberId),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls.TypePhoneNumberId.value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.DefaultPassword),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls.DefaultPassword.value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.ValueOfAllowedCallsToTheEmployee),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls
                        .ValueOfAllowedCallsToTheEmployee.value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.TheNumberOfDaysGrantedToTheEmployeeToSendTheBill),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls
                        .TheNumberOfDaysGrantedToTheEmployeeToSendTheBill.value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.FractionNumbers),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls.FractionNumbers.value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.IsDefaultPassword),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls.IsDefaultPassword.value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.IsSendPasswordByEmail),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls.IsSendPasswordByEmail
                        .value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.IsViewCallsThatHaveApriceEqualZero),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls
                        .IsViewCallsThatHaveApriceEqualZero.value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.IsAbilityOfTheAdministratorToControlEmployeeBills),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls
                        .IsAbilityOfTheAdministratorToControlEmployeeBills
                        .value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.IsReminderByEmail),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls.IsReminderByEmail.value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.IsReminderBySystem),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls.IsReminderBySystem.value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.SMTPServer),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.SMTPServer.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.SMTPUserEmail),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.SMTPUserEmail.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.SMTPUserPassword),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls.SMTPUserPassword.value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.SMTPPortNo),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls.SMTPPortNo.value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.IsUseSSL),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls.IsUseSSL.value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.IsRequiresAuthentication),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls.IsRequiresAuthentication
                        .value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.EmailForTest),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.EmailForTest.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.ImportCC),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ImportCC.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.ImportSubject),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ImportSubject.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.ImportBody),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ImportBody.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.ReminderIdentifyNewNumbersCC),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ReminderIdentifyNewNumbersCC.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.ReminderIdentifyNewNumbersSubject),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ReminderIdentifyNewNumbersSubject.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.ReminderIdentifyNewNumbersBody),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ReminderIdentifyNewNumbersBody.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.RejectionNumberCC),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.RejectionNumberCC.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.RejectionNumberSubject),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.RejectionNumberSubject.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.RejectionNumberBody),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.RejectionNumberBody.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.PaidCC),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.PaidCC.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.PaidSubject),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.PaidSubject.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.PaidBody),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.PaidBody.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.UnPaidCC),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.UnPaidCC.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.UnPaidSubject),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.UnPaidSubject.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.UnPaidBody),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.UnPaidBody.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.SubmittedCC),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.SubmittedCC.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.SubmittedSubject),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.SubmittedSubject.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.SubmittedBody),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.SubmittedBody.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.ReminderTotalDueCC),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ReminderTotalDueCC.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.ReminderTotalDueSubject),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ReminderTotalDueSubject.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.ReminderTotalDueBody),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ReminderTotalDueBody.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.ReminderStartPeriodSubmittBillCC),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ReminderStartPeriodSubmittBillCC.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.ReminderStartPeriodSubmittBillSubject),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ReminderStartPeriodSubmittBillSubject.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.ReminderStartPeriodSubmittBillBody),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ReminderStartPeriodSubmittBillBody.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.ReminderEndPeriodSubmittBillCC),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ReminderEndPeriodSubmittBillCC.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.ReminderEndPeriodSubmittBillSubject),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ReminderEndPeriodSubmittBillSubject.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.ReminderEndPeriodSubmittBillBody),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ReminderEndPeriodSubmittBillBody.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.EmailTestCC),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.EmailTestCC.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.EmailTestSubject),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.EmailTestSubject.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.EmailTestBody),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.EmailTestBody.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.DisplayNameEmail),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.DisplayNameEmail.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.IsDeleteFreeTypeNumber),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls.IsDeleteFreeTypeNumber
                        .value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.TaxAmount),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls.TaxAmount.value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.IsAutomatedApprovalBills),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls.IsAutomatedApprovalBills
                        .value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.IsAutomatedApprovalServices),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls.IsAutomatedApprovalServices
                        .value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.IsAutomatedApprovalPhoneNumbers),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls
                        .IsAutomatedApprovalPhoneNumbers.value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.IsJoinEmployeesWithLimitValue),
                (generalSettingsModel.settingValue = String(
                    this.frmGeneralSettings.controls
                        .IsJoinEmployeesWithLimitValue.value,
                ));
            this.generalSettingsListNew.push(generalSettingsModel);

            //
            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.NewServiceAddedCC),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.NewServiceAddedCC.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.NewServiceAddedSubject),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.NewServiceAddedSubject.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.NewServiceAddedBody),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.NewServiceAddedBody.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            //
            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.ServiceRemovedCC),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ServiceRemovedCC.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.ServiceRemovedSubject),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ServiceRemovedSubject.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName = Constants.ServiceRemovedBody),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ServiceRemovedBody.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            //
            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.ServicePriceGraterThanServicePlanCC),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ServicePriceGraterThanServicePlanCC.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.ServicePriceGraterThanServicePlanSubject),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ServicePriceGraterThanServicePlanSubject.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            generalSettingsModel = new GeneralSettingsModel();
            (generalSettingsModel.settingName =
                Constants.ServicePriceGraterThanServicePlanBody),
                (generalSettingsModel.settingValue = this.frmGeneralSettings.controls.ServicePriceGraterThanServicePlanBody.value);
            this.generalSettingsListNew.push(generalSettingsModel);

            return this.generalSettingsService
                .setGeneralSettings(this.generalSettingsListNew)
                .pipe(catchError((error) => of(null)))
                .subscribe((value) => {
                    this.getGeneralSettingsInfo();
                    if (value) {
                        this.notify.showTranslateMessage(
                            'UpdatedSuccessfully',
                            false,
                        );
                    } else {
                        this.notify.showTranslateMessage('UpdatedFailed', true);
                    }
                });
        }
    }

    public SendEmail() {
        this.generalSettingsService
            .sendTestEmail()
            .pipe(
                map((data) => {
                    if (data) {
                        this.notify.showTranslateMessage(
                            'EmailSentSuccessfully',
                        );
                    }
                }),
            )
            .subscribe((result) => {});
    }
}
