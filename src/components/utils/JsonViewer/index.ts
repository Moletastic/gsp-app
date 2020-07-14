import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import { $api } from '@/api'

interface TLObject {
    id: string
}

@Component
export default class JSONViewer extends Vue {
    @Prop()
    entity!: string
    @Prop()
    entity_id !:string
    @Prop()
    verbose !: string

    title : string = ""
    desc : string = ""

    mapping : {[key: string]: string} = {
        "students" : "Estudiante",
        "teachers" : "Profesor",
    }

    @Watch('entity_id')
    onEntityChanged(){
        this.init()
    }

    mounted(){
        this.init()
    }

    async init(){
        let name = this.entity_id;
        try {
            $debug('log', this.entity, this.entity_id);
            const obj : any = await $api.fetch(this.entity, this.entity_id);
            $debug('log', obj);
            if(this.verbose === "user"){
                name = obj.user.nick
            }
            else if(obj.hasOwnProperty(this.verbose)){
                name = "" + (obj)[<keyof TLObject>this.verbose]
            }
            const fields = JSON.stringify(obj, undefined, 2);
            this.desc = fields
        }catch(err){
            $debug('error', err);
            this.desc = "No se ha encontrado un registro asociado"
        }
        this.title = `${this.mapping[this.entity]} : ${name}`
    }
}