import { ILink, Link } from "./link";

import { IProgress } from "./progress";
import { ITag } from "./tag";
import { IMilestone, Milestone } from "./milestone";
import { IMeet, Meet } from "./meet";
import { IStudent, Student } from "../access/student";
import { ITeacher, Teacher } from "../access/teacher";
import { generateID, $debug, make_enum } from "@/utils";
import { Commit } from "./commit";

export interface ISubject {
    id: string;
    name: string;
    icon: string;
}

export class Subject implements ISubject {
    id!: string;
    name!: string;
    icon!: string;

    constructor(name: string, icon?: string) {
        this.id = generateID("sub");
        this.name = name;
        if (icon) {
            this.icon = icon;
        }
    }
}

export const ProjectState = make_enum([
    "CREATED",
    "STARTED",
    "IN_PROGRESS",
    "CHECKED",
    "PRESENTED",
    "APPROVED",
    "IN_PROGRESS2",
    "CHECKED2",
    "PRESENTED2",
    "APPROVED2",
    "REJECTED",
    "FINISHED",
    "CERTIFICATED"
]);

export type ProjectState = keyof typeof ProjectState;

export const FormatProjectState: { [key: string]: string } = {
    CREATED: "Creado",
    STARTED: "Iniciado",
    IN_PROGRESS: "Semestre 1: En desarrollo",
    PRESENTED: "Semestre 1: Presentado",
    CHECKED: "Semestre 1: Revisado",
    APPROVED: "Semestre 1: Aprobado",
    IN_PROGRESS2: "Semestre 2: En desarrollo",
    PRESENTED2: "Semestre 2: Presentado",
    CHECKED2: "Semestre 2: Revisado",
    APPROVED2: "Semestre 2: Aprobado",
    REJECTED: "Rechazado",
    FINISHED: "Finalizado",
    CERTIFICATED: "Titulado"
};

export const ProjectType = make_enum([
    "RESEARCH",
    "PROTOTYPE",
    "APPLICATION",
    "DATA_SCIENCE"
]);

export type ProjectType = keyof typeof ProjectType;

export type FMTProjectType = {
    [type in ProjectType]: string;
};

export const FormatProjectType: FMTProjectType = {
    APPLICATION: "Aplicación",
    DATA_SCIENCE: "Ciencia de Datos",
    PROTOTYPE: "Prototipo",
    RESEARCH: "Investigación"
};

export interface IProject {
    id: string;
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
    state: ProjectState;
    project_type: ProjectType;
}

export class Project implements IProject {
    id!: string;
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
    state: ProjectState = ProjectState.CREATED;
    project_type!: ProjectType;

    constructor(obj?: Partial<Project>) {
        if (obj) {
            this.id = obj.id || generateID("pro");
            this.title = obj.title || "";
            this.desc = obj.desc || "";
            this.type = obj.type || "";
            this.authors = obj.authors || [];
            this.guides = obj.guides || [];
            this.links = obj.links || [];
            this.subjects = obj.subjects || [];
            this.meets = obj.meets?.map(meet => new Meet(meet)) || [];
            this.milestones =
                obj.milestones?.map(mil => new Milestone(mil)) || [];
            this.progress = obj.progress || [];
            this.tags = obj.tags || [];
            if(typeof obj?.tags === "string"){
                this.tags = (<string>obj?.tags).split(";")
            } else {
                this.tags = obj?.tags || []
            }
            this.commits = obj.commits?.map(com => new Commit(com)) || [];
            this.state = obj.state || ProjectState.CREATED;
            this.project_type = obj.project_type || ProjectType.APPLICATION;
        }
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
