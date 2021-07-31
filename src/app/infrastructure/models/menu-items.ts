import { Injectable } from '@angular/core';
import { UserType } from './user';

export interface BadgeItem {
    type: string;
    value: string;
}
export interface Saperator {
    name: string;
    type?: string;
}
export interface SubChildren {
    state: string;
    name: string;
    type?: string;
}
export interface ChildrenItems {
    state: string;
    name: string;
    type?: string;
    child?: SubChildren[];
    roles?: UserType[];
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    badge?: BadgeItem[];
    saperator?: Saperator[];
    children?: ChildrenItems[];
    roles?: UserType[];
}

const MENUITEMS = [
    {
        state: 'landing',
        name: 'Landing',
        type: 'sub',
        icon: 'apps',
        roles: [UserType.SuperAdmin],
        children: [
            {
                state: 'landing-presentation',
                name: 'LandingPresentation',
                type: 'link',
                roles: [UserType.SuperAdmin],
            },
        ],
    },

    {
        state: 'bills',
        name: 'Bills',
        type: 'sub',
        icon: 'uploadfile',
        roles: [UserType.SuperAdmin, UserType.AdminGroup, UserType.Employee],
        children: [
            {
                state: 'upload-bills',
                name: 'UploadBills',
                type: 'link',
                roles: [UserType.SuperAdmin],
            },
            {
                state: 'billsSummary-list',
                name: 'BillsSummary',
                type: 'link',
                roles: [
                    UserType.SuperAdmin,
                    UserType.AdminGroup,
                    UserType.Employee,
                ],
            },
            // { state: 'billsDetails-list', name: 'BillDetails', type: 'link' },
        ],
    },

    {
        state: 'phonesBook',
        name: 'PhonesBook',
        type: 'sub',
        icon: 'contacts',
        roles: [UserType.SuperAdmin, UserType.AdminGroup, UserType.Employee],
        children: [
            {
                state: 'phonesBook-list',
                name: 'PhonesBook',
                type: 'link',
                roles: [
                    UserType.SuperAdmin,
                    UserType.Employee,
                    UserType.AdminGroup,
                ],
            },
            {
                state: 'comingNumbers-list',
                name: 'ComingPhoneNumbers',
                type: 'link',
                roles: [UserType.SuperAdmin],
            },
        ],
    },

    {
        state: 'reports',
        name: 'SystemReports',
        type: 'sub',
        icon: 'description',
        roles: [UserType.SuperAdmin, UserType.AdminGroup, UserType.Employee],
        children: [
            {
                state: 'calls-summary-report',
                name: 'CallsSummaryReport',
                type: 'link',
                roles: [
                    UserType.SuperAdmin,
                    UserType.Employee,
                    UserType.AdminGroup,
                ],
            },
            {
                state: 'calls-details-report',
                name: 'CallsDetailsReport',
                type: 'link',
                roles: [
                    UserType.SuperAdmin,
                    UserType.Employee,
                    UserType.AdminGroup,
                ],
            },
            {
                state: 'finance-report',
                name: 'FinanceReport',
                type: 'link',
                roles: [
                    UserType.SuperAdmin,
                    UserType.Employee,
                    UserType.AdminGroup,
                ],
            },
        ],
    },

    {
        state: 'users',
        name: 'users',
        type: 'sub',
        icon: 'people',
        roles: [UserType.SuperAdmin, UserType.AdminGroup, UserType.Employee],
        children: [
            {
                state: 'users-list',
                name: 'users',
                type: 'link',
                roles: [
                    UserType.SuperAdmin,
                    UserType.Employee,
                    UserType.AdminGroup,
                ],
            },
        ],
    },

    {
        state: 'system-definition',
        name: 'SystemSettings',
        type: 'sub',
        icon: 'settings',
        roles: [UserType.SuperAdmin],
        children: [
            {
                state: 'languages-settings',
                name: 'languagesSettings',
                type: 'link',
                roles: [UserType.SuperAdmin],
            },
            {
                state: 'countries-list',
                name: 'Countries',
                type: 'link',
                roles: [UserType.SuperAdmin],
            },
            {
                state: 'governorates-list',
                name: 'Governorates',
                type: 'link',
                roles: [UserType.SuperAdmin],
            },
            {
                state: 'operators-list',
                name: 'Operators',
                type: 'link',
                roles: [UserType.SuperAdmin],
            },
            {
                state: 'groups-list',
                name: 'Groups',
                type: 'link',
                roles: [UserType.SuperAdmin],
            },
            {
                state: 'jobs-list',
                name: 'Jobs',
                type: 'link',
                roles: [UserType.SuperAdmin],
            },
            {
                state: 'servicesTypes-list',
                name: 'ServicesTypes',
                type: 'link',
                roles: [UserType.SuperAdmin],
            },
            {
                state: 'general-settings',
                name: 'GeneralSettings',
                type: 'link',
                roles: [UserType.SuperAdmin],
            },
        ],
    },
];

@Injectable({
    providedIn: 'root',
})
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}
