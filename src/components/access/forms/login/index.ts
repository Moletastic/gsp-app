import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { ILoginForm } from "@/types/core/access";
import { VRule, VVal, VForm } from "@/types";

@Component
export default class LoginForm extends Vue {
    @Prop({ default: false })
    loading!: boolean;

    form: ILoginForm = {
        email: "",
        password: ""
    };

    rules: VVal = {
        email: [(val: string) => !!val || "Email requerido"],
        password: [(val: string) => !!val || "Contraseña requerida"]
    };

    onSubmit(): void {
        if (!this.$refs.form) {
            return;
        }
        const form: VForm = this.$refs.form as VForm;
        if (!form.validate()) {
            return;
        }
        this.sendForm();
    }

    @Emit("submit")
    sendForm(): ILoginForm {
        return this.form;
    }
}
