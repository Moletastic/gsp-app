import { Moment } from "moment";
import moment from "moment";
import { generateID } from "@/utils";
import { IGSPObject, GSPObject } from "../base";

export interface ICommit extends IGSPObject {
    title: string;
    desc: string;
    solved: boolean;
    solved_at: string | null;
    limit_date?: string | null;
    project_id: number | null;
}

// Acuerdo
export class Commit extends GSPObject implements ICommit {
    title!: string;
    desc!: string;
    solved_at!: string | null;
    solved = false;
    limit_date!: string | null;
    project_id!: number | null;

    constructor(partial: Partial<Commit>) {
        super(partial);
        this.title = partial?.title || "Acuerdo #";
        this.desc = partial?.desc || "";
        this.solved_at = partial.solved_at || null;
        this.solved = partial?.solved || false;
        this.limit_date = partial.limit_date || null;
        this.project_id = partial.project_id || null;
    }

    solve() {
        this.solved_at = moment(new Date()).toISOString();
        this.solved = true;
    }

    unsolve() {
        this.solved = false;
    }
}
