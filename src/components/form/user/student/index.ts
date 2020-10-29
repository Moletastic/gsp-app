import { Component, Vue, Watch } from "vue-property-decorator";
import { $debug } from "@/utils";
import { Career, Student } from "@/types/core/education";
import { $api } from "@/api";

@Component
export default class StudentForm extends Vue {
    form = new Student({});

    careers: Career[] = [];

    mounted(): void {
        this.init();
    }

    async init(): Promise<void> {
        this.careers = await this.getCareers();
    }

    async getCareers(): Promise<Career[]> {
        const data: Array<Career> = await $api.get("careers");
        return data;
    }
}
