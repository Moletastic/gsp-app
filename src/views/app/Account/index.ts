import { Vue, Component } from "vue-property-decorator";
import { $debug } from "@/utils/";
import { Account } from "@/types/core/access/user";
import { $api } from "@/api";
import { userModule } from "@/store";

@Component
export default class AccountView extends Vue {
    user: Account = new Account({});

    old_password = "";
    new_password = "";
    confirm_password = "";

    modal = false;

    openModal(): void {
        this.modal = true;
    }

    mounted(): void {
        this.init();
    }

    async init(): Promise<void> {
        try {
            const { user } = await $api.me();
            const account = new Account(user.account);
            user.account = account;
            userModule.setUser(user);
            this.user = account;
        } catch (err) {
            $debug("error", err);
        }
    }
}
