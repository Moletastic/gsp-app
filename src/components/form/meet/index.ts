import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { generateID, $debug } from '@/utils';
import { Meet, Channel } from '@/types/core/project';
import DateField from '@/components/fields/date/index.vue'
import { Mode } from '@/types/vuetify';
import moment from 'moment'

@Component({
    components:{
        DateField
    }
})
export default class MeetForm extends Vue {

    id = generateID("MEET")

    @Prop({default: []})
    channels !: Channel[]
    @Prop({default: false})
    disabled !: boolean

    meet_types = ["Presencial", "On-line"]
    meet_type = this.meet_types[1]

    @Prop({default : () => new Meet({})})
    form !: Meet;

    @Prop({default: "CHECK"})
    mode !: Mode ;

    moment = moment;

}
