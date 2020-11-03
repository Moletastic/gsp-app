import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { ILoginForm } from "@/types/core/access";
@Component
export default class LoginForm extends Vue {
    @Prop({ default: false })
    loading!: boolean;

    form: ILoginForm = {
        email: "",
        password: ""
    };

    @Emit("submit")
    onSubmit(): ILoginForm {
        return this.form;
    }
}
