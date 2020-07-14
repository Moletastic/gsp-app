export interface ICommit {
    id: string
    title: string
    desc: string
    solved: boolean
    solved_at: Date
    limit_date ?: Date
}

// Acuerdo
export class Commit implements ICommit {
    id!: string
    title!: string
    desc!: string
    solved_at !: Date
    solved: boolean = false;
    limit_date !: Date

    constructor(title ?: string){
        if(title) this.title = title;
    }

    solve(){
        this.solved_at = new Date();
        this.solved = true;
    }

    unsolve(){
        this.solved = false;
    }

}