import { ILink, Link } from "./link";

import { Progress } from "./progress";
import { Milestone } from "./milestone";
import { IMeet, Meet } from "./meet";
import { ITeacher, Teacher } from "../access/teacher";
import { make_enum } from "@/utils";
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
    "CREATED" = "En creación",
    "STARTED" = "Iniciando",
    "IN_PROGRESS" = "Semestre 1: Desarrollando",
    "PRESENTED" = "Semestre 1: Presentando",
    "CHECKED" = "Semestre 1: Revisando",
    "APPROVED" = "Semestre 1: Aprobado",
    "IN_PROGRESS2" = "Semestre 2: Desarrollando",
    "PRESENTED2" = "Semestre 2: Presentando",
    "APPROVED2" = "Semestre 2: Aprobado",
    "REJECTED" = "Rechazado",
    "FINISHED" = "Terminado",
    "CERTIFICATED" = "Condición de Titulación"
}

export const ProjectTypeEnum = make_enum([
    "RESEARCH",
    "PROTOTYPE",
    "APPLICATION",
    "DATA_SCIENCE"
]);
export type ProjectTypeEnum = keyof typeof ProjectTypeEnum;

export const FmtProjectType: { [key in ProjectTypeEnum]: string } = {
    RESEARCH: "Investigación",
    PROTOTYPE: "Prototipo",
    APPLICATION: "Aplicación",
    DATA_SCIENCE: "Ciencia de Datos"
};

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
    t: string;

    constructor(partial: Partial<IProjectType>) {
        super(partial);
        this.name = partial.name || "";
        const name: ProjectTypeEnum = this.name as ProjectTypeEnum;
        this.t = FmtProjectType[name] as string;
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
    commits: Commit[];
    reviews: IReview[];
    project_state: IProjectState | null;
    project_state_id: number;
    project_type: IProjectType | null;
    project_type_id: number;
}

export interface iProject extends IGSPObject {
    title: string;
    desc: string;
    project_state_id: number;
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
        this.guides = partial.guides?.map(g => new Teacher(g)) || [];
        this.links = partial.links?.map(l => new Link(l)) || [];
        this.reviews = partial.reviews?.map(r => new Review(r)) || [];
        this.subjects = partial.subjects?.map(s => new Subject(s)) || [];
        this.meets = partial.meets?.map(meet => new Meet(meet)) || [];
        this.milestones =
            partial.milestones?.map(mil => new Milestone(mil)) || [];
        this.progress = partial.progress || [];
        this.commits = partial.commits?.map(com => new Commit(com)) || [];
        this.project_state_id = partial.project_state_id || 0;
        this.project_state = partial.project_state
            ? new ProjectState(partial.project_state)
            : null;
        this.project_type_id = partial.project_type_id || 0;
        this.project_type = partial.project_type || null;
    }

    //public get_done_meets() : number{
    //return this.meets.reduce((i: number, value: Meet)  => {
    //return value.done ? 1 : 0;
    //}, 0);
    //}

    //public get_solved_milestone() : number{
    //return this.milestones.reduce((i: number, value: Milestone) => {
    //return value.solved ? 1 : 0;
    //}, 0);
    //}

    public getFmtType(): string {
        if (this.project_type && this.project_type.name) {
            const name: ProjectTypeEnum = this.project_type
                .name as ProjectTypeEnum;
            return FmtProjectType[name];
        }
        return "Desconocido";
    }

    getClean(): iProject {
        const {
            id,
            created_at,
            updated_at,
            deleted_at,
            is_valid,
            title,
            desc,
            project_type_id,
            project_state_id,
            entity,
            uid
        } = this;
        return {
            id,
            created_at,
            updated_at,
            deleted_at,
            is_valid,
            title,
            desc,
            project_type_id,
            project_state_id,
            entity,
            uid
        };
    }

    creatable(): Project {
        const obj = Object.assign({}, this);
        obj.milestones = obj.milestones.map(m => {
            m.id = null;
            return m;
        });
        obj.links = obj.links.map(l => {
            l.id = null;
            return l;
        });
        obj.meets = [];
        obj.commits = [];
        obj.progress = [];
        obj.reviews = [];
        obj.project_state = null;
        obj.project_state_id = 1;
        if (obj.project_type) {
            obj.project_type_id = obj.project_type.id as number;
            obj.project_type = null;
        }
        return obj;
    }

    clean(): Project {
        const obj = Object.assign({}, this);
        obj.meets = [];
        obj.milestones = [];
        obj.commits = [];
        obj.progress = [];
        obj.reviews = [];
        obj.project_state = null;
        obj.project_type = null;
        return obj;
    }

    get year(): number {
        return new Date(this.created_at).getFullYear();
    }
}
