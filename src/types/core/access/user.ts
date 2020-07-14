export interface IUser {
    id: string
    first_name: string
    last_name: string
    nick: string
    email: string
    pass_hash: string
}

export class User implements IUser {
    id !: string
    first_name : string = ""
    last_name : string = ""
    nick : string = ""
    email : string = ""
    readonly pass_hash !: string

    constructor(nick?: string){
        this.nick = nick || "";
    }

}