import { Component, Vue, Watch, Prop, Model } from 'vue-property-decorator'
import { $debug } from '@/utils'
import moment, { Moment } from 'moment'

@Component
export default class DateField extends Vue {

    @Prop({default : () => moment(new Date())})
    date !: Moment
    @Prop({default: "Ingresar Fecha: "})
    label !: string
    @Prop({default: false})
    outlined !: boolean
    @Prop({default: false})
    disabled !: boolean

    date_str = this.date.format("DD/MM/YYYY").substr(0, 10)
    picker = this.date.toISOString().substr(0, 10);
    menu = false;

    current = moment(new Date())

    allowedDates(val: string){
        return this.current.valueOf() < moment(val).valueOf()
    }

    @Watch("picker")
    onChangeDate(){
        //this.date = moment(this.picker);
        this.$set(this, 'date', moment(this.picker));
        this.date_str = this.date.format("DD/MM/YYYY").substr(0, 10);
        this.$emit("change", this.date);
    }

}
