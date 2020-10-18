import { IGSPObject, GSPObject } from "../base";
import { IProject } from "./project";

export interface IProgress extends IGSPObject {
    name: string;
    project_id: number;
    project?: IProject;
}

// Avance
export class Progress extends GSPObject implements IProgress {
    name: string;
    project_id: number;
    project?: IProject;

    constructor(partial: Partial<IProgress>) {
        super(partial);
        this.name = partial.name || "";
        this.project_id = partial.project_id || 0;
        this.project = partial.project;
    }
}
