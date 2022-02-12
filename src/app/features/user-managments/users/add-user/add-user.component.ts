import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
    ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '@app/infrastructure/core/services/auth/user.service';
import { AllocatedServicesService } from '@app/infrastructure/core/services/billingSystem/allocated-services.service';
import { GroupService } from '@app/infrastructure/core/services/billingSystem/group.service';
import { PlanService } from '@app/infrastructure/core/services/billingSystem/plan.service';
import { ServiceUsedService } from '@app/infrastructure/core/services/billingSystem/service-used.service';
import { SimCardTypeService } from '@app/infrastructure/core/services/billingSystem/sim-card-type.service';
import { SimProfileService } from '@app/infrastructure/core/services/billingSystem/sim-profile.service';
import { LanguagesService } from '@app/infrastructure/core/services/language/language.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { GroupModel } from '@app/infrastructure/models/project/groupModel';
import { LanguageModel } from '@app/infrastructure/models/project/LanguageModel';
import { PlanModel } from '@app/infrastructure/models/project/planModel';
import { ServiceUsedModel } from '@app/infrastructure/models/project/serviceUsedModel';
import { SimCardTypeModel } from '@app/infrastructure/models/project/SimCardTypeModel';
import { SimProfileModel } from '@app/infrastructure/models/project/SimProfileModel';
import { UserModel } from '@app/infrastructure/models/project/UserModel';
import { RoleModel } from '@app/infrastructure/models/RoleModel';
import { ResultActions } from '@app/infrastructure/shared/Services/CommonMemmber';
import { Constants } from '@app/infrastructure/utils/constants';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

interface Food {
    value: string;
    viewValue: string;
}

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
    public servicesUsedModel: ServiceUsedModel[] = [];
    public allocatedServices: Array<number> = [];
    public simCardTypesModel: SimCardTypeModel[] = [];
    public simProfilesModel: SimProfileModel[] = [];
    public serviceAmount: number = 0;
    public passwordPattern: RegExp = Constants.patterns.DIGIT_REGEX;
    public resultActions: ResultActions = ResultActions.CancelAdd;
    public plans: PlanModel;
    public totalPrice: number;

    constructor(
        @Inject(MAT_DIALOG_DATA) public userModel: UserModel,
        private formBuilder: FormBuilder,
        private notify: NotificationService,
        private groupService: GroupService,
        private languageService: LanguagesService,
        private userService: UserService,
        private dialogRef: MatDialogRef<AddUserComponent>,
        private sericeUsedService: ServiceUsedService,
        private allocatedServicesService: AllocatedServicesService,
        private simCardTypeService: SimCardTypeService,
        private simProfileService: SimProfileService,
        private planService: PlanService,
        private changeDetectorRef: ChangeDetectorRef,
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

    price(plan) {
        this.totalPrice = plan.price;
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
            ServicesUsedId: [null],
            SimCardTypeId: [null],
            SimProfileId: [null],
            PlanId: [null],
            Notes: [null],
            Price: [null],
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

            this.frmAddNew.controls.SimCardTypeId.setValue(
                this.userModel.simCardTypeId,
            );
            this.frmAddNew.controls.SimProfileId.setValue(
                this.userModel.simProfileId,
            );
            this.frmAddNew.controls.Notes.setValue(this.userModel.notes);
            this.frmAddNew.controls.PlanId.setValue(this.userModel.planId);
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
                mergeMap((rolesData) => {
                    this.rolesModel = rolesData;
                    return this.sericeUsedService.getAllServicesUsed();
                }),
                mergeMap((servicesUsed) => {
                    this.servicesUsedModel = servicesUsed;
                    return this.allocatedServicesService.getAllocatedServices(
                        this.frmAddNew.controls.Id.value,
                    );
                }),
                mergeMap((allocatedServices) => {
                    allocatedServices.forEach((element) => {
                        this.allocatedServices.push(element.serviceId);
                    });

                    this.frmAddNew.controls.ServicesUsedId.setValue(
                        this.allocatedServices,
                    );
                    this.sumServicesPrices();
                    return this.simCardTypeService.getAllSimCardTypes();
                }),
                mergeMap((cardTypes) => {
                    this.simCardTypesModel = cardTypes;
                    return this.simProfileService.getAllSimProfiles();
                }),
                mergeMap((simProfilesStatus) => {
                    this.simProfilesModel = simProfilesStatus;
                    return this.planService.getAllPlans();
                }),
                map((plan) => {
                    debugger;
                    this.plans = plan;
                    this.totalPrice = plan[0].price;
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage('ErrorOnLoadData');
                }),
            )
            .subscribe((result) => {
                this.changeDetectorRef.detectChanges();
            });
    }

    onSubmit() {
        this.isInProgress = true;
        var initialObservable = of({});

        initialObservable
            .pipe(
                mergeMap(() => {
                    return this.ID === 0
                        ? this.userService.IsUserExists(this.PhoneNumber).pipe(
                              mergeMap((data) => {
                                  if (!data) {
                                      return this.userService.addUser(
                                          this.frmAddNew.value,
                                      );
                                  } else {
                                      this.dialogRef.close(
                                          ResultActions.AlreadyExist,
                                      );
                                      return of(ResultActions.AlreadyExist);
                                  }
                              }),
                          )
                        : this.userService.updateUser(this.frmAddNew.value);
                }),
            )
            .subscribe((id) => {
                if (id) {
                    this.dialogRef.close(ResultActions.Added);
                    this.frmAddNew.reset();
                }
            });
    }

    sumServicesPrices() {
        this.serviceAmount = 0;
        this.frmAddNew.controls.ServicesUsedId.value.forEach((element) => {
            let serviceSelected = this.servicesUsedModel.find(
                (x) => x.id === element,
            );
            this.serviceAmount += serviceSelected.servicePrice;
        });
    }

    ResetControls() {
        this.frmAddNew.reset();
    }
}
