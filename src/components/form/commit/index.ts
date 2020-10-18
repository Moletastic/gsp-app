import { Prop, Component, Vue, Watch } from "vue-property-decorator";
import { $debug } from "@/utils";
import DateField from "@/components/fields/date/index.vue";
import { Commit } from "@/types/core/project";
import { Mode } from "@/types/vuetify";
import moment, { Moment } from "moment";

@Component({
    components: {
        DateField
    }
})
export default class CommitForm extends Vue {
    @Prop({ default: () => new Commit({}) })
    form!: Commit;

    @Prop({ default: 0 })
    project_id!: number;

    @Prop({ default: false })
    disabled!: boolean;

    @Prop({ default: "CHECK" })
    mode!: Mode;

    onDate(date: Moment) {
        this.form.limit_date = date.toISOString();
    }

    changeSolved() {
        this.form.solved ? this.solve() : this.unsolve();
    }

    solve() {
        this.form.solved_at = moment(new Date()).toISOString();
    }

    unsolve() {}

    get label() {
        return this.disabled ? "Fecha Límite" : "Ingresar fecha límite";
    }
}
