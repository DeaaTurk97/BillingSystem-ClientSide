import { ValidatorFn } from '@angular/forms';

import { IInputField } from './input';
import { ISaveCancelButtonConfig, SaveCancelButtonConfig } from './button';
import { ISelectField } from './select';

export type FieldType = 'input' | 'textarea' | 'select';

export interface IFormField<T> {
    name: string;
    label: string;
    placeholder: string;
    fieldType: FieldType;
    fieldConfig: T;
    validation?: ValidatorFn[];
    disabled?: boolean;
}

export class FormField<T> implements IFormField<T> {
    name: string;
    label: string;
    placeholder: string;
    fieldType: FieldType;
    fieldConfig: T;
    validation?: ValidatorFn[] = [];
    disabled?: boolean = false;

    constructor(configOverride?: Partial<IFormField<T>>) {
        if (configOverride) {
            Object.assign(this, configOverride);
        }
    }
}

export interface IFormConfig {
    formName: string;
    validation: ValidatorFn[];
    controls: IFormField<IInputField | ISelectField>[];
    submit?: ISaveCancelButtonConfig;
}

export class FormConfig implements IFormConfig {
    formName: string = 'form';
    validation: ValidatorFn[] = [];
    controls: IFormField<IInputField | ISelectField>[] = [];
    submit?: ISaveCancelButtonConfig = new SaveCancelButtonConfig();

    constructor(configOverride?: Partial<IFormConfig>) {
        if (configOverride) {
            Object.assign(this, configOverride);
        }
    }
}
