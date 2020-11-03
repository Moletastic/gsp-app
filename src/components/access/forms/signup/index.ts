import { Vue, Component, Emit } from "vue-property-decorator";
import { ISignupForm } from "@/types/core/access";

@Component
export default class SignupForm extends Vue {
    form: ISignupForm = {
        first_name: "",
        last_name: "",
        nick: "",
        email: "",
        password: "",
        account_type: "",
        rut: ""
    };

    user_types = ["Teacher", "Admin"];

    @Emit("submit")
    onSubmit(): ISignupForm {
        return this.form;
    }
}
