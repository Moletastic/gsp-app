import { Vue, Component, Mixins } from "vue-property-decorator";
import { $debug } from "@/utils/";
import { Account } from "@/types/core/access/user";
import { $api } from "@/api";
import { userModule, partialModule } from "@/store";
import { PasswordForm } from "@/types/core/access";
import FormValidation from "@/components/mixins/form-validation";
import ChangePasswordForm from "@/components/account/forms/password/index.vue";
import ProfileForm from "@/components/account/forms/profile";
import { APIError } from "@/types";

@Component({
    components: {
        ChangePasswordForm,
        ProfileForm: () =>
            import("@/components/account/forms/profile/index.vue")
    }
})
export default class AccountView extends Mixins(FormValidation) {
    form: Account = new Account({});
    loading = false;
    $refs!: {
        form: ProfileForm;
    };

    modal = false;

    openModal(): void {
        this.modal = true;
    }

    mounted(): void {
        this.init();
    }

    async init(): Promise<void> {
        this.loading = true;
        try {
            const user = await $api.me();
            const account = new Account(user.account);
            user.account = account;
            userModule.setUser(user);
            this.form = account;
        } catch (err) {
            partialModule.showError(err);
        } finally {
            this.loading = false;
        }
    }

    async onPasswordSubmit(form: PasswordForm): Promise<void> {
        this.loading = true;
        try {
            const { user, token } = await $api.changePassword(form);
            user.account = new Account(user.account);
            userModule.setUser(user);
            userModule.setToken(token);
            this.modal = false;
            partialModule.showSuccess("Cambio de contraseña exitoso");
        } catch (ex) {
            const err: APIError = ex;
            await partialModule.showError(err.response.data.errors.body);
            $debug("error", err);
        } finally {
            this.loading = false;
        }
    }

    submitForm(): void {
        this.$refs.form.onSubmit();
    }

    async onSubmit(account: Account): Promise<void> {
        this.loading = true;
        try {
            const { user, token } = await $api.updateAccount(account);
            user.account = new Account(user.account);
            userModule.setUser(user);
            userModule.setToken(token);
        } catch (err) {
            partialModule.showError(err);
        } finally {
            this.loading = false;
        }
    }
}
