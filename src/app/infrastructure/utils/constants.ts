export interface IPattern {
    DIGIT_REGEX: RegExp;
    EMAIL_REGEX: RegExp;
    SYMBOL_REGEX: RegExp;
    PASSWORD_REGEX: RegExp;
}

export interface IConstant {
    DefaultLanguageDirection: string;
    DefaultLanguageId: number;
    patterns: IPattern;
    MAXFILESIZE: number;
    MAXFILENAMELENGTH: number;
    Default_Image_Setting_Name: string;
}

export const Constants: IConstant = {
    patterns: {
        DIGIT_REGEX: /[0-9]/,
        EMAIL_REGEX: /^[a-z0-9!#$%&'*+\/=?^_\`{|}~.-]+@[a-z0-9]([a-z0-9-])+(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
        SYMBOL_REGEX: /[-+_!@#$%^&*,.?]/,
        PASSWORD_REGEX: /(?=.*\d)(?=.*[a-z]).{8}/,
    },
    // 10MB
    MAXFILESIZE: 10e6,
    MAXFILENAMELENGTH: 100,
    Default_Image_Setting_Name: 'default_image',
    DefaultLanguageId: 1,
    DefaultLanguageDirection: 'rtl',
};
