import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import { DataTable, Mode } from '@/types/vuetify'
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
    modal_mode: Mode = "CHECK";

    selected_index = 0;

    checkDetails(meet: Meet) {
        this.selected_index = this.table.data.indexOf(meet);
        this.modal_mode = "CHECK";
        this.meet = Object.assign({}, meet);
        this.modal = true;
    }

    drop() {
        this.$delete(this.table.data, this.selected_index);
        this.close();
    }

    edit() {
        this.modal_mode = "EDIT";
    }

    update() {
        this.$set(
            this.table.data,
            this.selected_index,
            Object.assign({}, this.meet)
        );
        this.close();
    }

    add() {
        this.meet = new Meet({});
        this.modal_mode = "ADD";
        this.modal = true;
    }

    create() {
        const index = this.table.data.length;
        this.$set(this.table.data, index, Object.assign({}, this.meet));
        this.close();
    }

    close() {
        this.modal = false;
        this.modal_mode = "CHECK";
    }

    moment = moment;

    async getChannels(){
        const data : Array<Channel> = await $api.get("channels");
        return data;
    }

}
