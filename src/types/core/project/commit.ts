import moment from "moment";
import { IGSPObject, GSPObject } from "../base";
import { INVALID_DATE } from "@/utils/const";

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
    project_id!: number;

    constructor(partial: Partial<Commit>) {
        super(partial);
        this.title = partial?.title || "Acuerdo #";
        this.desc = partial?.desc || "";
        this.solved_at = partial.solved_at || null;
        this.solved = partial?.solved || false;
        this.limit_date = partial.limit_date || null;
        this.project_id = partial.project_id || 0;
    }

    clean(): Commit {
        const commit = Object.assign({}, this);
        if (commit.limit_date === INVALID_DATE) {
            commit.limit_date = null;
        }
        return commit;
    }

    solve(): void {
        this.solved_at = moment(new Date()).toISOString();
        this.solved = true;
    }

    unsolve(): void {
        this.solved = false;
    }
}
