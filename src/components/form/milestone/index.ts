import { Component, Vue, Prop, Mixins, Emit } from "vue-property-decorator";
import { $debug } from "@/utils";
import { Milestone } from "@/types/core/project";
import DateField from "@/components/fields/date/index.vue";
import { Mode } from "@/types/vuetify";
import FormValidation from "@/components/mixins/form-validation";
import { VVal } from "@/types";

@Component({
    components: {
        DateField
    }
})
export default class MilestoneForm extends Mixins(FormValidation) {
    @Prop({ default: () => new Milestone({}) })
    form!: Milestone;

    @Prop({ default: 0 })
    project_id!: number;

    @Prop({ default: false })
    disabled!: boolean;

    @Prop({ default: "CHECK" })
    mode!: Mode;

    rules: VVal = {
        title: [(val: string) => !!val || "Titulo requerido"],
        date: [(val: string) => !!val || "Fecha requerida"]
    };

    onDate(date: string): void {
        this.form.date = date;
    }

    save(): void {
        this.$emit("save", Object.assign(this.form));
    }

    onSubmit(): void {
        if (this.validate()) {
            this.sendForm();
        }
    }

    @Emit("submit")
    sendForm(): Milestone {
        return new Milestone(this.form);
    }
}
