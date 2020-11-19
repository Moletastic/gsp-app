export type VRule = (val: any) => boolean | string;
export type VVal = { [key: string]: VRule[] };
export interface VForm extends HTMLFormElement {
    validate(): boolean;
}

export interface APIError {
    response: {
        data: {
            errors: { [key: string]: string };
        };
    };
}
