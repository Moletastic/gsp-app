import { Vue, Component, Prop, Mixins, Emit } from "vue-property-decorator";
import { Progress } from "@/types/core/project";
import { Mode } from "@/types/vuetify";
import FormValidation from "@/components/mixins/form-validation";
import { VVal } from "@/types";

@Component
export default class ProgressForm extends Mixins(FormValidation) {
    @Prop({ default: () => new Progress({}) })
    form!: Progress;

    @Prop({ default: 0 })
    project_id!: number;

    @Prop({ default: false })
    disabled!: boolean;

    @Prop({ default: "CHECK" })
    mode!: Mode;

    rules: VVal = {
        name: [(val: string) => !!val || "Nombre requerido"]
    };

    onSubmit(): void {
        if (this.validate()) {
            this.sendForm();
        }
    }

    @Emit("submit")
    sendForm(): Progress {
        return new Progress(this.form);
    }
}
