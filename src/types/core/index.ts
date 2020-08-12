import {} from "./project";
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

export class Milestone implements IMilestone {
    id!: string;
    title!: string;
    desc!: string;
    file_url!: string;
    solved!: boolean;
    date!: Moment;

    public constructor() {
        this.id = "MIL-1234";
        this.title = "Avance #";
        this.desc = "";
        this.file_url = "";
        this.solved = false;
        this.date = moment(new Date());
    }

    solve() {
        this.solved = true;
    }
}
