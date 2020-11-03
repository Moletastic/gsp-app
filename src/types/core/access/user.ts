import { IGSPObject, GSPObject } from "../base";

export interface IAccount extends IGSPObject {
    first_name: string;
    last_name: string;
    nick: string;
    email: string;
    rut: string;
    password: string | null;
    account_type: string;
}

export class Account extends GSPObject implements IAccount {
    first_name: string;
    last_name: string;
    nick: string;
    email: string;
    rut: string;
    readonly password: string | null;
    account_type: string;

    constructor(partial: Partial<IAccount>) {
        super(partial);
        this.first_name = partial.first_name || "";
        this.last_name = partial.last_name || "";
        this.email = partial.email || "";
        this.nick = partial.nick || "";
        this.password = partial.password || null;
        this.account_type = partial.account_type || "";
        this.rut = partial.rut || "";
    }
}

export interface User {
    id: number | null;
    account_id: number;
    account: IAccount;
}
