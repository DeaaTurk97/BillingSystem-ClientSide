import { UserType } from './user';

export interface IRoleDTO {
    name: UserType;
}

export class RoleDTO implements IRoleDTO {
    name: UserType = UserType.None;

    static isRoleType(role: UserType): role is UserType {
        const roleTypeList: UserType[] = [
            UserType.SuperAdmin,
            UserType.Admin,
            UserType.AdminGroup,
            UserType.Employee,
            UserType.Guest,
            UserType.Finance,
        ];
        return roleTypeList.includes(role);
    }

    static isSuperAdminRoleType(role: UserType): role is UserType {
        const typeList: UserType[] = [UserType.SuperAdmin];
        return typeList.includes(role);
    }

    static isAdminGroupRoleType(role: UserType): role is UserType {
        const typeList: UserType[] = [UserType.AdminGroup];
        return typeList.includes(role);
    }

    static isAdminRoleType(role: UserType): role is UserType {
        const typeList: UserType[] = [UserType.Admin];
        return typeList.includes(role);
    }

    static isEmployeeRoleType(role: UserType): role is UserType {
        const typeList: UserType[] = [UserType.Employee];
        return typeList.includes(role);
    }

    static isGuestRoleType(role: UserType): role is UserType {
        const typeList: UserType[] = [UserType.Guest];
        return typeList.includes(role);
    }

    static isFinanceRoleType(role: UserType): role is UserType {
        const typeList: UserType[] = [UserType.Finance];
        return typeList.includes(role);
    }

    static isMatchRoleType(
        role: UserType,
        roleMatch: UserType[],
    ): role is UserType {
        return roleMatch.includes(role);
    }

    constructor(configOverride?: IRoleDTO) {
        if (configOverride) {
            Object.assign(this, configOverride);
        }
    }
}
