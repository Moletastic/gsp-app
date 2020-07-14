import { IUser, User } from './user';

export interface ITeacher {
    id: string
    user: IUser
    entry_year: number
}

export class Teacher implements ITeacher {

    id !: string
    user: User = new User("")
    entry_year = 2010

    constructor(user: User){
        this.user = user;    
    }

}
