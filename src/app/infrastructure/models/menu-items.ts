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
        state: 'Bills',
        name: 'Bills',
        type: 'sub',
        icon: 'bubble_chart',
        children: [
            { state: 'upload-bills', name: 'UploadBills', type: 'link' },
        ],
    },

    {
        state: 'PhoneBook',
        name: 'PhonesBook',
        type: 'sub',
        icon: 'bubble_chart',
        children: [
            {
                state: '',
                name: 'OfficialPhoneBook',
                type: 'link',
            },
            {
                state: '',
                name: 'PersonalPhoneBook',
                type: 'link',
            },
        ],
    },

    {
        state: 'system-Reports',
        name: 'SystemReports',
        type: 'sub',
        icon: 'bubble_chart',
        children: [
            {
                state: 'general-settings',
                name: 'GeneralSettings',
                type: 'link',
            },
            {
                state: 'languages-settings',
                name: 'languagesSettings',
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

    {
        state: 'settings',
        name: 'ToolsSettings',
        type: 'sub',
        icon: 'bubble_chart',
        children: [
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
        ],
    },

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
