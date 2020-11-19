import { IGSPObject, GSPObject } from "../base";
import { IProject } from "../project";

export interface IDepartment extends IGSPObject {
    name: string;
    careers: ICareer[];
}

export class Department extends GSPObject implements IDepartment {
    name!: string;
    readonly careers: ICareer[];

    constructor(partial: Partial<IDepartment>) {
        super(partial);
        this.name = partial.name || "";
        this.careers = partial.careers || [];
    }
}

export interface IStudent extends IGSPObject {
    first_name: string;
    last_name: string;
    rut: string;
    career_id: number;
    career: ICareer | null;
    entry_year: number;
    readonly projects: IProject[];
}

export class Student extends GSPObject implements IStudent {
    first_name: string;
    last_name: string;
    rut: string;
    career_id: number;
    career: ICareer | null;
    entry_year: number;
    readonly projects: IProject[];

    constructor(partial: Partial<IStudent>) {
        super(partial);
        this.first_name = partial.first_name || "";
        this.last_name = partial.last_name || "";
        this.rut = partial.rut || "";
        this.career = partial.career || null;
        this.career_id = partial.career_id || 0;
        this.entry_year = partial.entry_year || 0;
        this.projects = partial.projects || [];
    }

    get full_name(): string {
        return `${this.first_name} ${this.last_name}`;
    }

    clean(): Student {
        const obj = Object.assign({}, this);
        obj.entry_year = Number(obj.entry_year);
        if (obj.career) {
            obj.career_id = obj.career.id as number;
            obj.career = null;
        }
        return obj;
    }
}

export interface ICareer extends IGSPObject {
    code: string;
    name: string;
    department: IDepartment | null;
    department_id: number;
    students: IStudent[];
}

export class Career extends GSPObject implements ICareer {
    code: string;
    name: string;
    department: IDepartment | null;
    department_id: number;
    readonly students: IStudent[];

    constructor(partial: Partial<ICareer>) {
        super(partial);
        this.code = partial.code || "";
        this.name = partial.name || "";
        this.department = partial.department || null;
        this.department_id = partial.department_id || 0;
        this.students = partial.students || [];
    }
}
