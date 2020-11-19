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

    clean(): Rubric {
        const obj = Object.assign({}, this);
        obj.reviews = [];
        return obj;
    }
}

export interface IReview extends IGSPObject {
    name: string;
    rubric_id: number | null;
    rubric: IRubric | null;
    project_id: number | null;
    project: IProject | null;
    reviewer_id: number | null;
    reviewer: ITeacher | null;
    score: number;
    file_url: string;
    comment: string;
}

export class Review extends GSPObject implements IReview {
    name: string;
    rubric_id: number | null;
    rubric: IRubric | null;
    project_id: number | null;
    project: IProject | null;
    reviewer_id: number | null;
    reviewer: ITeacher | null;
    score: number;
    file_url: string;
    comment: string;

    constructor(partial: Partial<IReview>) {
        super(partial);
        this.name = partial.name || "";
        this.rubric_id = partial.rubric_id || 0;
        this.rubric = partial.rubric || null;
        this.project_id = partial.project_id || 0;
        this.project = partial.project || null;
        this.reviewer_id = partial.reviewer_id || 0;
        this.reviewer = partial.reviewer || null;
        this.score = partial.score || 0;
        this.file_url = partial.file_url || "";
        this.comment = partial.comment || "";
    }

    clean(): Review {
        const project_id = this.project?.id || null;
        const reviewer_id = this.reviewer?.id || null;
        const rubric_id = this.rubric?.id || null;
        const obj = Object.assign({}, this);
        obj.project = null;
        obj.project_id = project_id;
        obj.reviewer = null;
        obj.reviewer_id = reviewer_id;
        obj.rubric = null;
        obj.rubric_id = rubric_id;
        return obj;
    }
}
