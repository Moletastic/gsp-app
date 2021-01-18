import {
    Vue,
    Component,
    Prop,
    Watch,
    Mixins,
    Emit
} from "vue-property-decorator";
import FormValidation from "@/components/mixins/form-validation";
import { PasswordForm } from "@/types/core/access";
import { VVal } from "@/types";

@Component
export default class ChangePasswordForm extends Mixins(FormValidation) {
    old_password = "";
    new_password = "";
    confirm_password = "";

    rules: VVal = {
        old_password: [(val: string) => !!val || "Contraseña requerida"],
        new_password: [(val: string) => !!val || "Contraseña nueva requerida"],
        confirm_password: [
            (val: string) => !!val || "Confirmación requerida",
            (val: string) => {
                const pass = this.new_password;
                return val === pass || "Contraseñas no coinciden";
            }
        ]
    };

    onSubmit(): void {
        if (this.validate()) {
            this.sendForm();
        }
    }

    @Emit("submit")
    sendForm(): PasswordForm {
        return {
            new_pass: this.new_password,
            current_pass: this.old_password
        };
    }
}
