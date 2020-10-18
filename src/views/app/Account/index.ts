import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { $debug } from "@/utils/";
import { User } from "@/types/core/access/user";

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
        this.user = this.$store.state.user as User;
    }
}
