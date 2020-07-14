export interface IDepartment {
    id: string
    name: string
}

export class Department implements IDepartment {
   id !: string
   name !: string 
}

export interface ICareer {
    id: string
    name: string
    department: IDepartment
}

export class Career implements ICareer {
    id !: string
    name !: string
    department = new Department()
}