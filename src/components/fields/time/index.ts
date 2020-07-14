import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import moment, { Moment } from 'moment';

@Component
export default class TimeField extends Vue {
    
    @Prop({default: () => moment(new Date())})
    date !: Moment;
    @Prop({default: "Ingresar Hora: "})
    label !:string

    picker = this.date.format("HH:mm")
    format : "24hr" | "ampm" = "24hr";
    menu = false;

    @Watch("picker")
    onChangePicker(){
        this.date = moment(new Date().setHours(Number(this.picker.substr(0,2)), Number(this.picker.substr(3,5))));
    }

}