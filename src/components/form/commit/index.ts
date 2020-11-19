import { Prop, Component, Vue, Mixins, Emit } from "vue-property-decorator";
import DateField from "@/components/fields/date/index.vue";
import { Commit } from "@/types/core/project";
import { Mode } from "@/types/vuetify";
import { Moment } from "moment";
import FormValidation from "@/components/mixins/form-validation";
import { VVal } from "@/types";

@Component({
    components: {
        DateField
    }
})
export default class CommitForm extends Mixins(FormValidation) {
    @Prop({ default: () => new Commit({}) })
    form!: Commit;

    @Prop({ default: 0 })
    readonly project_id!: number;

    @Prop({ default: false })
    readonly disabled!: boolean;

    @Prop({ default: "CHECK" })
    readonly mode!: Mode;

    rules: VVal = {
        title: [(val: string) => !!val || "Titulo requerido"],
        limit_date: [(val: string) => !!val || "Fecha límite requerida"]
    };

    onDate(date: string): void {
        this.form.limit_date = date;
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

    get show_form(): boolean {
        return this.mode === "ADD" || this.mode === "EDIT";
    }

    onSubmit(): void {
        if (this.validate()) {
            this.sendForm();
        }
    }

    @Emit("submit")
    sendForm(): Commit {
        return new Commit(this.form);
    }
}
