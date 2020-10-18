import { Component, Vue, Watch } from "vue-property-decorator";
import { $debug } from "@/utils";
import { User } from "@/types/core/access/user";
import { Career, Student } from "@/types/core/education";
import { $api } from "@/api";

@Component
export default class StudentForm extends Vue {
    form = new Student({});

    careers: Career[] = [];

    mounted() {
        this.init();
    }

    async init() {
        this.careers = await this.getCareers();
    }

    async getCareers() {
        const data: Array<Career> = await $api.get("careers");
        return data;
    }

    generateNick() {}
}
