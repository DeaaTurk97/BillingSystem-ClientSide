import { IRoleDTO } from './role';

export enum UserType {
    None = '',
    SuperAdmin = 'SuperAdmin',
    Admin = 'Admin',
    AdminGroup = 'AdminGroup',
    Employee = 'Employee',
    Guest = 'Guest',
    Finance = 'Finance',
}
export type StatusType = 'active' | 'inactive' | '';

export interface IUser {
    id: string;
    displayName: string;
    givenName: string;
    surname: string;
    email: string;
    roles: IRoleDTO[];
    status: StatusType;
}

export interface IUserDTO {
    results: IUser[];
}

export class UserDTO implements IUserDTO {
    results: IUser[] = [];

    constructor(configOverride?: Partial<IUserDTO>) {
        if (configOverride) {
            Object.assign(this, configOverride);
        }
    }
}
