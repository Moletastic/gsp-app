import { Component, Vue, Watch } from 'vue-property-decorator'
import { generateID } from '@/utils';

interface Agreement {
    id : string
    name : string
    limit_date: Date
    solved: boolean
}

@Component
export default class AgreementForm extends Vue {
    id = generateID("AGGR") 

    form : Agreement = {
        id : this.id,
        limit_date: new Date,
        name : "Acuerdo #",
        solved : false
    }

    toggleSolved(){
        this.form.solved = !this.form.solved
    }
}