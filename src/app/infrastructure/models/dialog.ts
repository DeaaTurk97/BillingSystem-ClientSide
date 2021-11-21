export interface IConfirmDialogConfig {
    id?: number;
    title: string;
    messageList: string[];
    action: string;
    showCancel: boolean;
    email: string;
}

export class ConfirmDialogConfig implements IConfirmDialogConfig {
    id?: number = 0;
    title: string = 'Confirm';
    messageList: string[] = ['Do you want to continue?'];
    action: string = 'Confirm';
    showCancel: boolean = true;
    email: string = '';

    constructor(configOverride?: Partial<IConfirmDialogConfig>) {
        if (configOverride) {
            Object.assign(this, configOverride);
        }
    }
}
