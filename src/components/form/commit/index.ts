import { Prop, Component, Vue, Watch } from "vue-property-decorator";
import { $debug } from "@/utils";
import DateField from "@/components/fields/date/index.vue";
import { Commit } from "@/types/core/project";
import { Mode } from "@/types/vuetify";
import { Moment } from "moment";

@Component({
    components: {
        DateField
    }
})
export default class CommitForm extends Vue {
    @Prop({ default: () => new Commit({}) })
    form!: Commit;

    @Prop({ default: 0 })
    readonly project_id!: number;

    @Prop({ default: false })
    readonly disabled!: boolean;

    @Prop({ default: "CHECK" })
    readonly mode!: Mode;

    onDate(date: Moment): void {
        this.form.limit_date = date.toISOString();
    }

    changeSolved(): void {
        this.form.solved ? this.solve() : this.unsolve();
    }

    solve(): void {
        this.form.solved_at = this.$moment(new Date()).toISOString();
    }

    unsolve(): void {
        this.form.solved_at = null;
        this.form.solved = false;
    }

    get label(): string {
        return this.disabled ? "Fecha Límite" : "Ingresar fecha límite";
    }
}
