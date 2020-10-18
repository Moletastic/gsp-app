import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { $debug } from "@/utils/";
import { ISignupForm } from "@/types/core/access";

@Component
export default class SignupForm extends Vue {
    form: ISignupForm = {
        first_name: "",
        last_name: "",
        nick: "",
        email: "",
        password: "",
        user_type: ""
    };

    user_types = ["Teacher", "Admin"];

    onSubmit() {
        this.$emit("submit", this.form);
    }
}
