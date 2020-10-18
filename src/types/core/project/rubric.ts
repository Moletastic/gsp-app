import { IProject } from "./project";
import { ITeacher } from "../access/teacher";
import { IGSPObject, GSPObject } from "../base";

export interface IRubric extends IGSPObject {
    name: string;
    file_url: string;
    reviews: IReview[];
}

export class Rubric extends GSPObject implements IRubric {
    name: string;
    file_url: string;
    reviews: IReview[];

    constructor(partial: Partial<IRubric>) {
        super(partial);
        this.name = partial.name || "";
        this.file_url = partial.file_url || "";
        this.reviews = partial.reviews || [];
    }
}

export interface IReview extends IGSPObject {
    name: string;
    rubric_id: number;
    rubric?: IRubric;
    project_id: number;
    project?: IProject;
    reviewer_id: number;
    reviewer?: ITeacher;
    score: string;
    file_url: string;
}

export class Review extends GSPObject implements IReview {
    name: string;
    rubric_id: number;
    rubric?: IRubric;
    project_id: number;
    project?: IProject;
    reviewer_id: number;
    reviewer?: ITeacher;
    score: string;
    file_url: string;

    constructor(partial: Partial<IReview>) {
        super(partial);
        this.name = partial.name || "";
        this.rubric_id = partial.rubric_id || 0;
        this.rubric = partial.rubric;
        this.project_id = partial.project_id || 0;
        this.project = partial.project;
        this.reviewer_id = partial.reviewer_id || 0;
        this.reviewer = partial.reviewer;
        this.score = partial.score || "";
        this.file_url = partial.file_url || "";
    }
}
