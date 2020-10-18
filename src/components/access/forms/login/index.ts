import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { $debug } from "@/utils/";
import { ILoginForm } from "@/types/core/access";

@Component
export default class LoginForm extends Vue {
    form: ILoginForm = {
        email: "",
        password: ""
    };

    onSubmit() {
        this.$emit("submit", this.form);
    }
}
