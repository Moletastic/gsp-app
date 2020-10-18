import { Component, Vue, Watch } from "vue-property-decorator";
import { $debug } from "@/utils";
import { User } from "@/types/core/access/user";
import { Career } from "@/types/core/education";
import { $api } from "@/api";
import { Teacher } from "@/types/core/access/teacher";

@Component
export default class TeacherForm extends Vue {
    form = new Teacher({});

    mounted() {}

    generateNick() {
        if (this.form.user) {
            const { first_name, last_name } = this.form.user;
            this.form.user.nick =
                first_name.split(" ")[0].toLowerCase() +
                    "." +
                    last_name.split(" ")[0].toLowerCase() || this.form.uid;
        }
    }
}
