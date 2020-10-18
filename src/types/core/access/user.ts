import { IGSPObject, GSPObject } from "../base";

export interface IUser extends IGSPObject {
    first_name: string;
    last_name: string;
    nick: string;
    email: string;
    password: string | null;
    user_type: string;
}

export class User extends GSPObject implements IUser {
    first_name: string;
    last_name: string;
    nick: string;
    email: string;
    readonly password: string | null;
    user_type: string;

    constructor(partial: Partial<IUser>) {
        super(partial);
        this.first_name = partial.first_name || "";
        this.last_name = partial.last_name || "";
        this.email = partial.email || "";
        this.nick = partial.nick || "";
        this.password = partial.password || null;
        this.user_type = partial.user_type || "";
    }
}
