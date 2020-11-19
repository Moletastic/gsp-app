import {
    Vue,
    Component,
    Prop,
    Watch,
    Mixins,
    Emit
} from "vue-property-decorator";
import FormValidation from "@/components/mixins/form-validation";
import { Account } from "@/types/core/access/user";
import { VVal } from "@/types";
import { checkRut, checkEmail } from "@/utils/validators";

@Component
export default class ProfileForm extends Mixins(FormValidation) {
    @Prop({ default: () => new Account({}) })
    form!: Account;

    rules: VVal = {
        first_name: [(val: string) => !!val || "Nombre requerido"],
        last_name: [(val: string) => !!val || "Apellido requerido"],
        email: [
            (val: string) => !!val || "Email requerido",
            (val: string) => checkEmail(val) || "Email inválido"
        ],
        nick: [(val: string) => !!val || "Nick requerido"],
        rut: [
            (val: string) => !!val || "Rut requerido",
            (val: string) => checkRut(val) || "Rut inválido"
        ]
    };

    account = new Account({});

    @Watch("form")
    onChangeForm(form: Account): void {
        this.setAccount(form);
    }

    onSubmit(): void {
        if (this.validate()) {
            this.sendForm();
        }
    }

    setAccount(account: Account): void {
        this.account = account;
    }

    @Emit("submit")
    sendForm(): Account {
        return new Account(this.form);
    }
}
