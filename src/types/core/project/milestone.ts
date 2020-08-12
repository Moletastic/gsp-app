import { generateID, $debug } from "@/utils";
import { Moment } from "moment";
import moment from "moment";

export interface IMilestone {
    id: string;
    title: string;
    desc: string;
    file_url: string;
    solved: boolean;
    date: Moment;
}

// Hito
export class Milestone implements IMilestone {
    id!: string;
    title!: string;
    desc!: string;
    file_url!: string;
    solved!: boolean;
    date!: Moment;

    constructor(partial?: Partial<Milestone>) {
        if (partial) {
            this.id = partial.id || generateID("MIL");
            this.title = partial.title || "";
            this.desc = partial.desc || "";
            this.file_url = partial.file_url || "";
            this.solved = Boolean(partial.solved);
            this.date = moment(partial.date);
        } else {
            this.id = generateID("MIL");
            this.title = "Avance #";
            this.desc = "";
            this.file_url = "";
            this.solved = false;
            this.date = moment(new Date());
        }
    }

    solve() {
        this.solved = true;
    }

    getClean() {
        const { id, title, desc, file_url, solved, date } = this;
        return { id, title, desc, file_url, solved, date: date.toISOString() };
    }
}
