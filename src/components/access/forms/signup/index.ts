import { Vue, Component, Emit } from "vue-property-decorator";
import { ISignupForm } from "@/types/core/access";
import { VForm, VVal } from "@/types";
import { checkRut, checkEmail } from "@/utils/validators";

@Component
export default class SignupForm extends Vue {
    form: ISignupForm = {
        first_name: "",
        last_name: "",
        nick: "",
        email: "",
        password: "",
        account_type: "Teacher",
        rut: ""
    };

    rules: VVal = {
        first_name: [(val: string) => !!val || "Nombre requerido"],
        last_name: [(val: string) => !!val || "Apellido requerido"],
        nick: [(val: string) => !!val || "Nick requerido"],
        email: [
            (val: string) => !!val || "Email requerido",
            (val: string) => checkEmail(val) || "Email inválido"
        ],
        password: [(val: string) => !!val || "Contraseña requerido"],
        rut: [
            (val: string) => !!val || "Rut requerido",
            (val: string) => checkRut(val) || "Rut inválido"
        ],
        account_type: [(val: string) => !!val || "Tipo de cuenta requerida"]
    };

    user_types = [
        {
            name: "Teacher",
            t: "Profesor"
        },
        {
            name: "Admin",
            t: "Administrador"
        }
    ];

    onSubmit(): void {
        if (!this.$refs.form) {
            return;
        }
        const form = this.$refs.form as VForm;
        if (!form.validate()) {
            return;
        }
        this.sendForm();
    }

    @Emit("submit")
    sendForm(): ISignupForm {
        return this.form;
    }
}
