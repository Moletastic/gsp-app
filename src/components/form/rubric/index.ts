import {
    Vue,
    Component,
    Prop,
    Watch,
    Mixins,
    Emit
} from "vue-property-decorator";
import { Rubric } from "@/types/core/project/rubric";
import FormValidation from "@/components/mixins/form-validation";
import { VVal } from "@/types";

@Component
export default class RubricForm extends Mixins(FormValidation) {
    form = new Rubric({});

    rules: VVal = {
        name: [(val: string) => !!val || "Nombre requerido"],
        file_url: [(val: string) => !!val || "Se requiere link de archivo"]
    };

    mounted(): void {
        this.form = new Rubric({});
    }

    onSubmit(): void {
        if (this.validate()) {
            this.sendForm();
        }
    }

    @Emit("submit")
    sendForm(): Rubric {
        return new Rubric(this.form);
    }
}
