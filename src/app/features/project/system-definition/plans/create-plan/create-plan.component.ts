import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanService } from '@app/infrastructure/core/services/billingSystem/plan.service';
import { ServiceUsedService } from '@app/infrastructure/core/services/billingSystem/service-used.service';
import { PlanModel } from '@app/infrastructure/models/project/planModel';
import { PlanServiceModel } from '@app/infrastructure/models/project/planServiceModel';
import { ServiceUsedModel } from '@app/infrastructure/models/project/serviceUsedModel';
import { number } from 'ngx-custom-validators/src/app/number/validator';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-create-plan',
    templateUrl: './create-plan.component.html',
    styleUrls: ['./create-plan.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePlanComponent implements OnInit {
    public isInProgress = false;
    public formAddNew: FormGroup;
    public serviceModel: ServiceUsedModel[] = [];
    public serviceAmount: number = 0;
    public services: ServiceUsedModel;
    public planServiceModel: PlanServiceModel;
    public index;

    constructor(
        @Inject(MAT_DIALOG_DATA) public planModel: PlanModel,
        private formBuilder: FormBuilder,
        private planService: PlanService,
        private dialogRef: MatDialogRef<CreatePlanComponent>,
        private sericeUsedService: ServiceUsedService,
    ) {}

    get ID() {
        return this.formAddNew.controls.Id.value;
    }

    ngOnInit(): void {
        this.ngInitialControlForm();
        this.loadServiceUsedData();
        this.setPlanDetails();
        this.newService();
        // this.updateData(this.index);
    }

    loadServiceUsedData() {
        this.sericeUsedService.getAllServicesUsed().subscribe((result) => {
            this.services = result;
            console.log(this.services);
        });
    }

    addService() {
        console.log(this.PlanServicesForm);
        this.PlanServicesForm.push(
            this.formBuilder.group({
                PlanService: [null],
                Limit: [null],
                Unit: [''],
                AdditionalUnit: [''],
                AdditionalUnitPrice: [null],
            }),
        );
    }

    newService(): FormControl {
        return this.formBuilder.control('');
    }

    removeService() {
        this.PlanServicesForm.clearAsyncValidators();
    }

    ngInitialControlForm() {
        this.formAddNew = this.formBuilder.group({
            Id: [0],
            Name: ['', Validators.required],
            Description: ['', Validators.required],
            Code: ['', Validators.required],
            Price: [null],
            PlanServices: this.formBuilder.array([
                this.formBuilder.group({
                    planService: [null],
                    limit: [null],
                    unit: [''],
                    additionalUnit: [''],
                    additionalUnitPrice: [null],
                }),
            ]),
        });

        console.log(this.PlanServicesForm);
    }

    get PlanServicesForm(): FormArray {
        return this.formAddNew.get('PlanServices') as FormArray;
    }

    setPlanDetails() {
        if (this.planModel) {
            console.log(this.planModel);
            this.formAddNew.controls.Id.setValue(this.planModel.id);
            this.formAddNew.controls.Name.setValue(this.planModel.name);
            this.formAddNew.controls.Description.setValue(
                this.planModel.description,
            );
            this.formAddNew.controls.Code.setValue(this.planModel.code);
            this.formAddNew.controls.Price.setValue(this.planModel.price);

            this.formAddNew.controls.PlanServices.setValue(
                this.planModel.planServices[0].planService,
            );
            this.formAddNew.controls.Limit.setValue(
                this.planModel.planServices[0].limit,
            );
            this.formAddNew.controls.Unit.setValue(
                this.planModel.planServices[0].unit,
            );
            this.formAddNew.controls.AdditionalUnit.setValue(
                this.planModel.planServices[0].additionalUnit,
            );
            this.formAddNew.controls.AdditionalUnitPrice.setValue(
                this.planModel.planServices[0].additionalUnitPrice,
            );
        }
    }
    // updateData(index: number) {
    //   this.PlanServicesForm.at(index).get('PlanServices').setValue([
    //     this.formAddNew.controls.PlanService.setValue(this.planServiceModel.planService),
    //     this.formAddNew.controls.Limit.setValue(this.planServiceModel.limit),
    //     this.formAddNew.controls.Unit.setValue(this.planServiceModel.unit),
    //     this.formAddNew.controls.AdditionalUnit.setValue(this.planServiceModel.additionalUnit),
    //     this.formAddNew.controls.AdditionalUnitPrice.setValue(this.planServiceModel.additionalUnitPrice),
    //   ]);
    // }

    onSubmit() {
        this.isInProgress = true;

        var initialObservable = of({});
        initialObservable
            .pipe(
                mergeMap(() => {
                    return this.ID === 0
                        ? this.planService.addPlan(this.formAddNew.value)
                        : this.planService.updatePlan(this.formAddNew.value);
                }),
            )
            .subscribe((id) => {
                if (id) {
                    this.dialogRef.close(this.formAddNew.value);
                    this.formAddNew.reset();
                }
            });
    }

    resetFormBuilder() {
        this.formAddNew.reset();
        this.isInProgress = false;
    }
}
