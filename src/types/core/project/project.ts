import { ILink, Link } from './link';

import { IProgress } from './progress';
import { ITag } from './tag';
import { IMilestone, Milestone } from './milestone';
import { IMeet, Meet } from './meet';
import { IStudent, Student } from '../access/student';
import { ITeacher, Teacher } from '../access/teacher';
import { generateID, $debug, make_enum } from '@/utils';
import { Commit } from './commit';

export interface ISubject {
    id: string
    name: string
    icon : string
}

export class Subject implements ISubject {
    id !: string
    name !: string
    icon !: string

    constructor(name: string, icon ?: string){
        this.id = generateID("sub")
        this.name = name;
        if(icon){
            this.icon = icon;
        }
    }
}

export const ProjectState = make_enum(["CREATED", "STARTED", "IN_PROGRESS", "CHECKED", "PRESENTED", "APPROVED", "REJECTED" ,"FINISHED", "TITULADO"])
export type ProjectState = keyof typeof ProjectState;

export interface IProject {
    id: string
    title: string
    desc: string
    authors: IStudent[]
    guides: ITeacher[]
    links: ILink[]
    subjects: ISubject[]
    meets : IMeet[]
    milestones: Milestone[]
    progress: Progress[]
    tags : string[]
    commits : Commit[]
    state: ProjectState
}

export class Project implements IProject {
    id !: string
    title !: string
    desc !: string
    authors: Student[] = []
    guides: Teacher[] = []
    links: Link[] = []
    subjects: Subject[] = []
    meets : Meet[] = []
    milestones: Milestone[] = []
    progress: Progress[] = []
    tags : string[] = []
    commits : Commit[] = []
    state: ProjectState = ProjectState.CREATED

    constructor(obj ?: Partial<Project>){
        if(obj){
            this.id = obj.id || generateID("pro");
            this.title = obj.title || "";
            this.desc = obj.desc || "";
            this.authors = obj.authors || [];
            this.guides = obj.guides || [];
            this.links = obj.links || [];
            this.subjects = obj.subjects || [];
            this.meets = obj.meets || [];
            this.milestones = obj.milestones || [];
            this.progress = obj.progress || [];
            this.tags = obj.tags || []
            this.commits = obj.commits || [];
            this.state = obj.state || ProjectState.CREATED
        }
    }


    public get_done_meets(){
        return this.meets.reduce((index, val) => {
            return val.done ? 1 : 0
        }, 0)
    }

    public get_solved_milestone(){
        return this.milestones.reduce((index, val) => {
            return val.solved ? 1 : 0
        }, 0)
    }

    getClean(){
        const milestones = this.milestones.map(milestone => milestone.getClean());
        return {...this, milestones, tags: this.tags.join(";")}
    }
}
