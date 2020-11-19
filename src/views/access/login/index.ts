import { Vue, Component } from "vue-property-decorator";
import { $debug } from "@/utils";
import { $api } from "@/api";
import LoginForm from "@/components/access/forms/login/index.vue";
import SignupForm from "@/components/access/forms/signup/index.vue";
import { ILoginForm, ISignupForm } from "@/types/core/access";
import { userModule, partialModule } from "@/store";

@Component({
    components: {
        LoginForm,
        SignupForm
    }
})
export default class LoginView extends Vue {
    toggle_form = false;
    loading = false;
    logo = require("@/assets/timeline.png");

    async login(form: ILoginForm): Promise<void> {
        this.loading = true;
        const { email, password } = form;
        try {
            const data = await $api.login(email, password);
            userModule.setUser(data.user);
            localStorage.setItem("gsp:token", data.token);
            await partialModule.showSnack({
                message: "Login exitoso!",
                color: "success"
            });
            this.signIn();
        } catch (err) {
            partialModule.showSnack({
                close: true,
                color: "error",
                message: "Email o contraseña incorrecta"
            });
        } finally {
            this.loading = false;
        }
    }

    async signUp(form: ISignupForm): Promise<void> {
        const { message } = await $api.signUp(form);
        partialModule.showSnack({
            message,
            close: true,
            color: "success"
        });
        this.toggle_form = false;
    }

    signIn(): void {
        this.$store.commit("signup");
        this.$router.push({ name: "Home" });
    }

    get btn_text(): string {
        return this.toggle_form ? "Volver a Login" : "Crear cuenta";
    }
}
