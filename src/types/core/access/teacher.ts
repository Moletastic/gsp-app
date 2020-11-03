import { IAccount} from "./user";
import { IGSPObject, GSPObject } from "../base";

export interface ITeacher extends IGSPObject {
    account: IAccount | null;
    account_id: number;
    entry_year: number;
}

export class Teacher extends GSPObject implements ITeacher {
    account: IAccount | null;
    account_id: number;
    entry_year: number;

    constructor(partial: Partial<ITeacher>) {
        super(partial);
        this.account = partial.account || null;
        this.account_id = partial.account_id || 0;
        this.entry_year = partial.entry_year || 0;
    }

    clean(): Teacher {
        const obj = Object.assign({}, this);
        return obj;
    }
}
