import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { $debug } from "@/utils";
import { $api } from "@/api";
import LoginForm from "@/components/access/forms/login/index.vue";
import SignupForm from "@/components/access/forms/signup/index.vue";
import { ILoginForm, ISignupForm } from "@/types/core/access";

@Component({
    components: {
        LoginForm,
        SignupForm
    }
})
export default class LoginView extends Vue {
    toggle_form = false;

    async login(form: ILoginForm) {
        const { email, password } = form;
        const data = await $api.login(email, password);
        this.$store.commit("set_user", data.user);
        localStorage.setItem("gsp:token", data.token);
        this.signIn();
    }

    async signUp(form: ISignupForm) {
        $debug("log", form);
        const user = await $api.signUp(form);
        $debug("log", user);
    }

    signIn() {
        this.$store.commit("signup");
        this.$router.push({ name: "Home" });
    }
}
