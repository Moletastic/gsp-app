import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import { DataTable } from '@/types/vuetify'
import { Commit } from '@/types/core/project';
import moment from 'moment';

@Component
export default class CommitTable extends Vue {
    @Prop({default: () => {
        return new DataTable<Commit>({
            headers: [
                {
                    text: "Acuerdo",
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
            rowsPerPageText: "Acuerdos por página"
        })
    }})
    table !: DataTable<Commit>;
    moment = moment;
}