import { IUser, User } from './user';
import { ICareer, Career } from '../education';

export interface IStudent {
    id: string
    user: IUser
    career: ICareer
    entry_year: Number
}

export class Student implements IStudent {
    id !: string
    user: User = new User("")
    career: Career = new Career()
    entry_year: Number = 2015

    constructor(user?: User ,career ?: Career){
        this.user = user || new User();
        if(career) this.career = career;
    }

}