import { IUser, User } from "./user";
import { IGSPObject, GSPObject } from "../base";

export interface ITeacher extends IGSPObject {
    user: IUser | null;
    user_id: number;
    entry_year: number;
}

export class Teacher extends GSPObject implements ITeacher {
    user: IUser | null;
    user_id: number;
    entry_year: number;

    constructor(partial: Partial<ITeacher>) {
        super(partial);
        this.user = partial.user || null;
        this.user_id = partial.user_id || 0;
        this.entry_year = partial.entry_year || 0;
    }
}
