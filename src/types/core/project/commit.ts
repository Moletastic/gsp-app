import { Moment } from "moment";
import moment from "moment";
import { generateID } from "@/utils";

export interface ICommit {
    id: string;
    title: string;
    desc: string;
    solved: boolean;
    solved_at: Moment;
    limit_date?: Moment;
}

// Acuerdo
export class Commit implements ICommit {
    id!: string;
    title!: string;
    desc!: string;
    solved_at!: Moment;
    solved: boolean = false;
    limit_date!: Moment;

    constructor(partial?: Partial<Commit>) {
        this.id = partial?.id || generateID("COM");
        this.title = partial?.title || "Acuerdo #";
        this.desc = partial?.desc || "";
        this.solved_at = moment(partial?.solved_at) || moment(new Date());
        this.solved = partial?.solved || false;
        this.limit_date = moment(partial?.limit_date) || moment(new Date());
    }

    solve() {
        this.solved_at = moment(new Date());
        this.solved = true;
    }

    unsolve() {
        this.solved = false;
    }
}
