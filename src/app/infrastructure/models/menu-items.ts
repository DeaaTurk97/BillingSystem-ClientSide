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
    settingName?: string;
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

//#region Syria....
// const MENUITEMS = [
//     // {
//     //     state: 'landing',
//     //     name: 'Landing',
//     //     type: 'sub',
//     //     icon: 'apps',
//     //     roles: [UserType.SuperAdmin],
//     //     children: [
//     //         {
//     //             state: 'landing-presentation',
//     //             name: 'LandingPresentation',
//     //             type: 'link',
//     //             roles: [UserType.SuperAdmin],
//     //         },
//     //     ],
//     // },

//     {
//         state: 'bills',
//         name: 'Bills',
//         type: 'sub',
//         icon: 'uploadfile',
//         roles: [
//             UserType.SuperAdmin,
//             UserType.AdminGroup,
//             UserType.Employee,
//             UserType.Finance,
//         ],
//         children: [
//             {
//                 state: 'comingBills-list',
//                 name: 'ComingBills',
//                 type: 'link',
//                 roles: [
//                     UserType.SuperAdmin,
//                     UserType.AdminGroup,
//                     UserType.Finance,
//                 ],
//                 settingName: 'IsAutomatedApprovalBills', //getting this from general Settings
//             },
//             {
//                 state: 'upload-bills',
//                 name: 'UploadBills',
//                 type: 'link',
//                 roles: [UserType.SuperAdmin],
//                 settingName: '',
//             },
//             {
//                 state: 'upload-bills-lebanon',
//                 name: 'UploadBills',
//                 type: 'link',
//                 roles: [UserType.SuperAdmin],
//                 settingName: '',
//             },
//             {
//                 state: 'billsSummary-list',
//                 name: 'BillsSummary',
//                 type: 'link',
//                 roles: [
//                     UserType.Employee,
//                     UserType.AdminGroup,
//                     UserType.SuperAdmin,
//                 ],
//                 settingName: '',
//             },
//             {
//                 state: 'comingServices-list',
//                 name: 'ComingServices',
//                 type: 'link',
//                 roles: [UserType.SuperAdmin, UserType.AdminGroup],
//                 settingName: 'IsAutomatedApprovalServices',
//             },
//         ],
//     },

//     {
//         state: 'phonesBook',
//         name: 'PhonesBook',
//         type: 'sub',
//         icon: 'contacts',
//         roles: [UserType.SuperAdmin, UserType.AdminGroup, UserType.Employee],
//         children: [
//             {
//                 state: 'phonesBook-list',
//                 name: 'PhonesBook',
//                 type: 'link',
//                 roles: [
//                     UserType.SuperAdmin,
//                     UserType.Employee,
//                     UserType.AdminGroup,
//                 ],
//                 settingName: '',
//             },
//             {
//                 state: 'comingNumbers-list',
//                 name: 'ComingPhoneNumbers',
//                 type: 'link',
//                 roles: [UserType.SuperAdmin, UserType.AdminGroup],
//                 settingName: 'IsAutomatedApprovalPhoneNumbers',
//             },
//         ],
//     },

//     {
//         state: 'reports',
//         name: 'SystemReports',
//         type: 'sub',
//         icon: 'description',
//         roles: [UserType.SuperAdmin, UserType.AdminGroup],
//         children: [
//             {
//                 state: 'calls-summary-report',
//                 name: 'CallsSummaryReport',
//                 type: 'link',
//                 roles: [UserType.SuperAdmin, UserType.AdminGroup],
//                 settingName: '',
//             },
//             {
//                 state: 'calls-details-report',
//                 name: 'CallsDetailsReport',
//                 type: 'link',
//                 roles: [UserType.SuperAdmin, UserType.AdminGroup],
//                 settingName: '',
//             },
//             {
//                 state: 'finance-report',
//                 name: 'FinanceReport',
//                 type: 'link',
//                 roles: [UserType.SuperAdmin, UserType.AdminGroup],
//                 settingName: '',
//             },
//         ],
//     },

//     {
//         state: 'users',
//         name: 'users',
//         type: 'sub',
//         icon: 'people',
//         roles: [UserType.SuperAdmin, UserType.AdminGroup],
//         settingName: '',
//         children: [
//             {
//                 state: 'users-list',
//                 name: 'users',
//                 type: 'link',
//                 roles: [UserType.SuperAdmin, UserType.AdminGroup],
//                 settingName: '',
//             },
//         ],
//     },

//     {
//         state: 'system-definition',
//         name: 'SystemSettings',
//         type: 'sub',
//         icon: 'settings',
//         roles: [UserType.SuperAdmin],
//         children: [
//             {
//                 state: 'languages-settings',
//                 name: 'languagesSettings',
//                 type: 'link',
//                 roles: [UserType.SuperAdmin],
//                 settingName: '',
//             },
//             {
//                 state: 'countries-list',
//                 name: 'Countries',
//                 type: 'link',
//                 roles: [UserType.SuperAdmin],
//                 settingName: '',
//             },
//             {
//                 state: 'governorates-list',
//                 name: 'Governorates',
//                 type: 'link',
//                 roles: [UserType.SuperAdmin],
//                 settingName: '',
//             },
//             {
//                 state: 'operators-list',
//                 name: 'Operators',
//                 type: 'link',
//                 roles: [UserType.SuperAdmin],
//                 settingName: '',
//             },
//             {
//                 state: 'groups-list',
//                 name: 'Groups',
//                 type: 'link',
//                 roles: [UserType.SuperAdmin],
//                 settingName: '',
//             },
//             {
//                 state: 'jobs-list',
//                 name: 'Jobs',
//                 type: 'link',
//                 roles: [UserType.SuperAdmin],
//                 settingName: '',
//             },
//             {
//                 state: 'servicesUsed-list',
//                 name: 'ServicesUsed',
//                 type: 'link',
//                 roles: [UserType.SuperAdmin],
//                 settingName: '',
//             },
//             {
//                 state: 'general-settings',
//                 name: 'GeneralSettings',
//                 type: 'link',
//                 roles: [UserType.SuperAdmin],
//                 settingName: '',
//             },
//         ],
//     },
// ];
//#region

//#region Lebanor....
const MENUITEMS = [
    // {
    //     state: 'landing',
    //     name: 'Landing',
    //     type: 'sub',
    //     icon: 'apps',
    //     roles: [UserType.SuperAdmin],
    //     children: [
    //         {
    //             state: 'landing-presentation',
    //             name: 'LandingPresentation',
    //             type: 'link',
    //             roles: [UserType.SuperAdmin],
    //         },
    //     ],
    // },

    {
        state: 'bills',
        name: 'Bills',
        type: 'sub',
        icon: 'insert_drive_file',
        roles: [
            UserType.SuperAdmin,
            UserType.AdminGroup,
            UserType.Employee,
            UserType.Finance,
        ],
        children: [
            {
                state: 'comingBills-list',
                name: 'ComingBills',
                type: 'link',
                roles: [
                    UserType.SuperAdmin,
                    UserType.AdminGroup,
                    UserType.Finance,
                ],
            },
            {
                state: 'upload-bills-lebanon',
                name: 'UploadBills',
                type: 'link',
                roles: [UserType.SuperAdmin],
            },
            {
                state: 'billsSummary-list',
                name: 'BillsSummary',
                type: 'link',
                roles: [
                    UserType.Employee,
                    UserType.AdminGroup,
                    UserType.SuperAdmin,
                ],
            },
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
        ],
    },

    {
        state: 'reports',
        name: 'SystemReports',
        type: 'sub',
        icon: 'description',
        roles: [UserType.SuperAdmin, UserType.AdminGroup],
        children: [
            {
                state: 'calls-summary-report',
                name: 'CallsSummaryReport',
                type: 'link',
                roles: [UserType.SuperAdmin, UserType.AdminGroup],
            },
            {
                state: 'calls-details-report',
                name: 'CallsDetailsReport',
                type: 'link',
                roles: [UserType.SuperAdmin, UserType.AdminGroup],
            },
            {
                state: 'finance-report',
                name: 'FinanceReport',
                type: 'link',
                roles: [UserType.SuperAdmin, UserType.AdminGroup],
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
                roles: [UserType.SuperAdmin, UserType.AdminGroup],
            },
            {
                state: 'change-password',
                name: 'changePassword',
                type: 'link',
                roles: [
                    UserType.SuperAdmin,
                    UserType.AdminGroup,
                    UserType.Employee,
                    UserType.Guest,
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
                settingName: '',
            },
            {
                state: 'countries-list',
                name: 'Countries',
                type: 'link',
                roles: [UserType.SuperAdmin],
                settingName: '',
            },
            {
                state: 'governorates-list',
                name: 'Governorates',
                type: 'link',
                roles: [UserType.SuperAdmin],
                settingName: '',
            },
            {
                state: 'operators-list',
                name: 'Operators',
                type: 'link',
                roles: [UserType.SuperAdmin],
                settingName: '',
            },
            {
                state: 'groups-list',
                name: 'Groups',
                type: 'link',
                roles: [UserType.SuperAdmin],
                settingName: '',
            },
            {
                state: 'jobs-list',
                name: 'Jobs',
                type: 'link',
                roles: [UserType.SuperAdmin],
                settingName: '',
            },
            {
                state: 'plans-list',
                name: 'Plans',
                type: 'link',
                roles: [UserType.SuperAdmin],
                settingName: '',
            },
            {
                state: 'manage-subscription',
                name: 'Manage Subscription',
                type: 'link',
                roles: [UserType.SuperAdmin],
                settingName: '',
            },
            {
                state: 'servicesUsed-list',
                name: 'ServicesUsed',
                type: 'link',
                roles: [UserType.SuperAdmin],
                settingName: '',
            },
            {
                state: 'general-settings',
                name: 'GeneralSettings',
                type: 'link',
                roles: [UserType.SuperAdmin],
                settingName: '',
            },
        ],
    },
];
//#endregion

@Injectable({
    providedIn: 'root',
})
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}
