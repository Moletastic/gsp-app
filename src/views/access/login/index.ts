import { Vue, Component } from "vue-property-decorator";
import { $debug } from "@/utils";
import { $api } from "@/api";
import LoginForm from "@/components/access/forms/login/index.vue";
import SignupForm from "@/components/access/forms/signup/index.vue";
import { ILoginForm, ISignupForm } from "@/types/core/access";
import { userModule } from "@/store";

@Component({
    components: {
        LoginForm,
        SignupForm
    }
})
export default class LoginView extends Vue {
    toggle_form = false;
    loading = false;

    async login(form: ILoginForm): Promise<void> {
        this.loading = true;
        const { email, password } = form;
        try {
            const data = await $api.login(email, password);
            userModule.setUser(data.user);
            localStorage.setItem("gsp:token", data.token);
            this.signIn();
        } catch (err) {
            $debug("error", err);
        }
    }

    async signUp(form: ISignupForm): Promise<void> {
        const user = await $api.signUp(form);
        $debug("log", user);
    }

    signIn(): void {
        this.$store.commit("signup");
        this.$router.push({ name: "Home" });
    }
}
