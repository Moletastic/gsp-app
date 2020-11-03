import { IGSPObject, GSPObject } from "../base";

export interface IMilestone extends IGSPObject {
    title: string;
    desc: string;
    file_url: string;
    solved: boolean;
    date: string | null;
    project_id: number;
}

export class Milestone extends GSPObject implements IMilestone {
    title: string;
    desc: string;
    file_url: string;
    solved: boolean;
    date: string | null;
    project_id: number;

    constructor(partial: Partial<Milestone>) {
        super(partial);
        this.title = partial.title || "Hito #";
        this.desc = partial.desc || "";
        this.file_url = partial.file_url || "";
        this.solved = partial.solved || false;
        this.date = partial.date || null;
        this.project_id = partial.project_id || 0;
    }

    solve(): void {
        this.solved = true;
    }

    clean(): Milestone {
        const obj = Object.assign({}, this);
        return obj;
    }
}
