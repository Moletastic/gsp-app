import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import { DataTable } from '@/types/vuetify'
import { Meet, Channel } from '@/types/core/project';
import moment from 'moment'
import MeetForm from '@/components/form/meet/index.vue'
import { $api } from '@/api';

@Component({
    components: {
        MeetForm
    }
})
export default class MeetTable extends Vue {
    @Prop({default: () => {
        return new DataTable<Meet>({
            headers: [
                {
                    text: "Nombre",
                    value: "name"
                },
                {
                    text: "Canal",
                    value: "channel"
                },
                {
                    text: "Realizada",
                    value: "done"
                },
                {
                    text: "",
                    value: "_actions"
                }
            ],
            rowsPerPageText: "Reuniones por página"
        })
    }})
    table !: DataTable<Meet>;

    channels : Channel[] = []

    mounted(){
        this.init();
    }

    async init(){
        this.channels = await this.getChannels();
    }

    meet = new Meet({});

    modal = false;

    onCheckDetail(meet: Meet){
        this.meet = meet;
        this.modal = true;
    }

    moment = moment;

    async getChannels(){
        const data : Array<Channel> = await $api.get("channels");
        return data;
    }

}