import { Component, Vue} from "vue-property-decorator";
import { Teacher } from "@/types/core/access/teacher";

@Component({
    name: "TeacherForm"
})
export default class TeacherForm extends Vue {
    form = new Teacher({});

    generateNick(): void {
        if (this.form.account) {
            const { first_name, last_name } = this.form.account;
            this.form.account.nick =
                first_name.split(" ")[0].toLowerCase() +
                    "." +
                    last_name.split(" ")[0].toLowerCase() || this.form.uid;
        }
    }
}
