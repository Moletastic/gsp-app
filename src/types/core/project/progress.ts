import { IGSPObject, GSPObject } from "../base";
import { IProject } from "./project";

export interface IProgress extends IGSPObject {
    name: string;
    project_id: number;
    project: IProject | null;
}

// Avance
export class Progress extends GSPObject implements IProgress {
    name: string;
    project_id: number;
    project: IProject | null;

    constructor(partial: Partial<IProgress>) {
        super(partial);
        this.name = partial.name || "";
        this.project_id = partial.project_id || 0;
        this.project = partial.project || null;
    }

    clean(): Progress {
        const obj = Object.assign({}, this);
        obj.project = null;
        return obj;
    }
}
