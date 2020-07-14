import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import { DataTable } from '@/types/vuetify'
import { Milestone } from '@/types/core/project';
import MilestoneForm from '@/components/form/milestone/index.vue'
import moment from 'moment'

@Component({
    components:{
        MilestoneForm
    }
})
export default class MilestonesTable extends Vue {
    @Prop({default: () => {
        return new DataTable<Milestone>({
            headers: [
                {
                    text: "Hito",
                    value: "title"
                },
                {
                    text: "Resuelto",
                    value: "solved"
                },
                {
                    text: "",
                    value: "_actions"
                }
            ],
            rowsPerPageText: "Hitos por página"
        })
    }})
    table !: DataTable<Milestone>;

    milestone = new Milestone();

    modal = false;

    onCheckDetail(milestone: Milestone){
        this.milestone = milestone;
        this.modal = true;
    }

    moment = moment;
}