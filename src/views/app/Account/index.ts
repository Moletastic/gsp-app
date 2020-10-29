import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { $debug } from "@/utils/";
import { User } from "@/types/core/access/user";
import { $api } from "@/api";

@Component
export default class AccountView extends Vue {
    user: User = new User({});

    old_password = "";
    new_password = "";
    confirm_password = "";

    modal = false;

    openModal() {
        this.modal = true;
    }

    mounted() {
        this.init();
    }

    async init() {
        try {
            const {user} = await $api.me();
            const account = new User(user.account)
            this.$store.state.user = account;
            this.user = account;
        }catch(err){
            $debug("error", err)
        }
    }
}
