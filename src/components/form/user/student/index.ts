import { Component, Vue, Prop, Emit, Mixins } from "vue-property-decorator";
import { Career, Student } from "@/types/core/education";
import { $api } from "@/api";
import { projectModule } from "@/store";
import FormValidation from "@/components/mixins/form-validation";
import { checkRut, checkEmail } from "@/utils/validators";
import { VVal } from "@/types";

@Component
export default class StudentForm extends Mixins(FormValidation) {
    form: Student = new Student({});

    rules: VVal = {
        rut: [
            (rut: string) => !!rut || "Rut requerido",
            (rut: string) => checkRut(rut) || "Rut inválido"
        ],
        first_name: [(val: string) => !!val || "Nombre requerido"],
        last_name: [(val: string) => !!val || "Apellido requerido"],
        email: [
            (val: string) => !!val || "Email requerido",
            (val: string) => checkEmail(val) || "Email inválido"
        ],
        career: [(val: Career) => !!val || "Carrera requerida"]
    };

    mounted(): void {
        this.init();
    }

    async init(): Promise<void> {
        if (this.careers.length === 0) {
            const careers = await this.getCareers();
            projectModule.setCareers(careers);
        }
    }

    get careers(): Career[] {
        return projectModule.careers;
    }

    async getCareers(): Promise<Career[]> {
        const res = await $api.get<Career>("career");
        return res;
    }

    onSubmit(): void {
        if (this.validate()) {
            this.sendForm();
        }
    }

    @Emit("submit")
    sendForm(): Student {
        return new Student(this.form);
    }
}
