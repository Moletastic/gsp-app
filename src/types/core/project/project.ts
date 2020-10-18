import { ILink, Link } from "./link";

import { IProgress, Progress } from "./progress";
import { ITag } from "./tag";
import { IMilestone, Milestone } from "./milestone";
import { IMeet, Meet } from "./meet";
import { ITeacher, Teacher } from "../access/teacher";
import { generateID, $debug, make_enum } from "@/utils";
import { Commit } from "./commit";
import { IStudent, Student } from "../education";
import { IReview, Review } from "./rubric";
import { IGSPObject, GSPObject } from "../base";

export interface ISubject extends IGSPObject {
    name: string;
    icon: string;
}

export class Subject extends GSPObject implements ISubject {
    name!: string;
    icon!: string;

    constructor(partial: Partial<ISubject>) {
        super(partial);
        this.name = partial.name || "";
        this.icon = partial.icon || "";
    }
}

export enum FmtProjectState {
    "CREATED" = "Creado",
    "STARTED" = "Iniciado",
    "IN_PROGRESS" = "Semestre 1: Desarrollando",
    "PRESENTED" = "Semestre 1: Presentando",
    "CHECKED" = "Semestre 1: En Revisión",
    "APPROVED" = "Semestre 1: Aprobado",
    "IN_PROGRESS2" = "Semestre 2: Desarrollando",
    "PRESENTED2" = "Semestre 2: Presentando",
    "APPROVED2" = "Semestre 2: Aprobado",
    "REJECTED" = "Rechazado",
    "FINISHED" = "Terminado",
    "CERTIFICATED" = "Condición de Titulación"
}

export interface IProjectState extends IGSPObject {
    name: string;
}

export class ProjectState extends GSPObject implements IProjectState {
    name: string;

    constructor(partial: Partial<IProjectState>) {
        super(partial);
        this.name = partial.name || "CREATED";
    }

    get formated(): string {
        return (
            FmtProjectState[<keyof typeof FmtProjectState>this.name] ||
            this.name
        );
    }
}

export interface IProjectType extends IGSPObject {
    name: string;
}

export class ProjectType extends GSPObject implements IProjectType {
    name: string;

    constructor(partial: Partial<IProjectType>) {
        super(partial);
        this.name = partial.name || "";
    }
}

export interface IProject extends IGSPObject {
    title: string;
    desc: string;
    authors: IStudent[];
    guides: ITeacher[];
    links: ILink[];
    subjects: ISubject[];
    meets: IMeet[];
    milestones: Milestone[];
    progress: Progress[];
    tags: string[];
    commits: Commit[];
    reviews: IReview[];
    project_state: IProjectState | null;
    project_state_id: number;
    project_type: IProjectType | null;
    project_type_id: number;
}

export class Project extends GSPObject implements IProject {
    title!: string;
    desc!: string;
    type!: string;
    authors: Student[] = [];
    guides: Teacher[] = [];
    links: Link[] = [];
    subjects: Subject[] = [];
    meets: Meet[] = [];
    milestones: Milestone[] = [];
    progress: Progress[] = [];
    tags: string[] = [];
    commits: Commit[] = [];
    reviews: Review[] = [];
    project_state: ProjectState | null;
    project_state_id: number;
    project_type: IProjectType | null;
    project_type_id: number;

    constructor(partial: Partial<IProject>) {
        super(partial);
        this.title = partial.title || "";
        this.desc = partial.desc || "";
        this.authors = partial.authors?.map(a => new Student(a)) || [];
        this.guides = partial.guides || [];
        this.links = partial.links || [];
        this.reviews = partial.reviews || [];
        this.subjects = partial.subjects || [];
        this.meets = partial.meets?.map(meet => new Meet(meet)) || [];
        this.milestones =
            partial.milestones?.map(mil => new Milestone(mil)) || [];
        this.progress = partial.progress || [];
        this.tags = partial.tags || [];
        if (typeof partial?.tags === "string") {
            this.tags = (<string>partial?.tags).split(";");
        } else {
            this.tags = partial?.tags || [];
        }
        this.commits = partial.commits?.map(com => new Commit(com)) || [];
        this.project_state_id = partial.project_state_id || 0;
        this.project_state = partial.project_state
            ? new ProjectState(partial.project_state)
            : null;
        this.project_type_id = partial.project_type_id || 0;
        this.project_type = partial.project_type || null;
    }

    public get_done_meets() {
        return this.meets.reduce((index, val) => {
            return val.done ? 1 : 0;
        }, 0);
    }

    public get_solved_milestone() {
        return this.milestones.reduce((index, val) => {
            return val.solved ? 1 : 0;
        }, 0);
    }

    getClean() {
        const milestones = this.milestones.map(milestone =>
            milestone.getClean()
        );
        return { ...this, milestones, tags: this.tags.join(";") };
    }
}
