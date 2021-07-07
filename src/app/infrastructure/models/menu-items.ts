import { Injectable } from '@angular/core';

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
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    badge?: BadgeItem[];
    saperator?: Saperator[];
    children?: ChildrenItems[];
}

const MENUITEMS = [
    {
        state: 'landing',
        name: 'Landing',
        type: 'sub',
        icon: 'apps',
        children: [
            {
                state: 'landing-presentation',
                name: 'LandingPresentation',
                type: 'link',
            },
        ],
    },

    {
        state: 'bills',
        name: 'Bills',
        type: 'sub',
        icon: 'bubble_chart',
        children: [
            { state: 'upload-bills', name: 'UploadBills', type: 'link' },
            { state: 'billsSummary-list', name: 'BillsSummary', type: 'link' },
            { state: 'billsDetails-list', name: 'BillDetails', type: 'link' },
        ],
    },

    {
        state: 'bills',
        name: 'PhonesBook',
        type: 'sub',
        icon: 'bubble_chart',
        children: [
            {
                state: 'phonesBook-list',
                name: 'PhonesBook',
                type: 'link',
            },
            {
                state: 'comingNumbers-list',
                name: 'ComingPhoneNumbers',
                type: 'link',
            },
        ],
    },

    {
        state: 'reports',
        name: 'SystemReports',
        type: 'sub',
        icon: 'bubble_chart',
        children: [
            {
                state: 'calls-summary-report',
                name: 'CallsSummaryReport',
                type: 'link',
            },
            {
                state: 'calls-details-report',
                name: 'CallsDetailsReport',
                type: 'link',
            },
            {
                state: 'finance-report',
                name: 'FinanceReport',
                type: 'link',
            },
        ],
    },

    {
        state: 'users',
        name: 'Users',
        type: 'sub',
        icon: 'bubble_chart',
        children: [{ state: 'users-list', name: 'Users', type: 'link' }],
    },

    // {
    //     state: 'settings',
    //     name: 'ToolsSettings',
    //     type: 'sub',
    //     icon: 'bubble_chart',
    //     children: [
    //         {
    //             state: 'countries-list',
    //             name: 'Countries',
    //             type: 'link',
    //         },
    //         {
    //             state: 'governorates-list',
    //             name: 'Governorates',
    //             type: 'link',
    //         },
    //         {
    //             state: 'operators-list',
    //             name: 'Operators',
    //             type: 'link',
    //         },
    //         {
    //             state: 'groups-list',
    //             name: 'Groups',
    //             type: 'link',
    //         },
    //         {
    //             state: 'jobs-list',
    //             name: 'Jobs',
    //             type: 'link',
    //         },
    //     ],
    // },

    {
        state: 'system-definition',
        name: 'SystemSettings',
        type: 'sub',
        icon: 'bubble_chart',
        children: [
            {
                state: 'languages-settings',
                name: 'languagesSettings',
                type: 'link',
            },
            {
                state: 'countries-list',
                name: 'Countries',
                type: 'link',
            },
            {
                state: 'governorates-list',
                name: 'Governorates',
                type: 'link',
            },
            {
                state: 'operators-list',
                name: 'Operators',
                type: 'link',
            },
            {
                state: 'groups-list',
                name: 'Groups',
                type: 'link',
            },
            {
                state: 'jobs-list',
                name: 'Jobs',
                type: 'link',
            },
            {
                state: 'servicesTypes-list',
                name: 'ServicesTypes',
                type: 'link',
            },
            {
                state: 'general-settings',
                name: 'GeneralSettings',
                type: 'link',
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
