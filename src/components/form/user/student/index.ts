import { Component, Vue } from "vue-property-decorator";
import { Career, Student } from "@/types/core/education";
import { $api } from "@/api";
import {projectModule} from '@/store';

@Component
export default class StudentForm extends Vue {
    form = new Student({});

    mounted(): void {
        this.init();
    }

    async init(): Promise<void> {
        if(this.careers.length === 0){
            const careers = await this.getCareers();
            projectModule.setCareers(careers);
        }
    }

    get careers() : Career[]{
        return projectModule.careers;
    }

    async getCareers() : Promise<Career[]> {
        const res = await $api.get<Career>("careers");
        return res
    }

}
