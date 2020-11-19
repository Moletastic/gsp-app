import { Vue, Component } from "vue-property-decorator";
import RubricForm from "@/components/form/rubric/index.vue";
import { Rubric, IRubric } from "@/types/core/project/rubric";
import { $api } from "@/api";
import { partialModule, projectModule } from "@/store";
import { Student, IStudent } from "@/types/core/education";
import StudentForm from "@/components/form/user/student/index.vue";
import { $debug } from "@/utils";

@Component({
    components: {
        RubricForm,
        StudentForm
    }
})
export default class AdminView extends Vue {
    rubrics: Rubric[] = [];
    rubric_modal = false;

    students: Student[] = [];
    student_modal = false;

    mounted(): void {
        this.init();
    }

    async init(): Promise<void> {
        try {
            const rubrics = await $api.get<IRubric>("rubric");
            const students = await $api.get<IStudent>("student");
            this.rubrics = rubrics.map(r => new Rubric(r));
            this.students = students.map(s => new Student(s));
        } catch (err) {
            partialModule.showError(err);
        }
    }

    openRubricModal(): void {
        this.rubric_modal = true;
    }

    async onSubmitRubric(rubric: Rubric): Promise<void> {
        try {
            const res = await $api.create("rubric", rubric);
            const index = this.rubrics.length;
            this.$set(this.rubrics, index, res);
            projectModule.setRubrics(this.rubrics);
            partialModule.showSuccess("Rubrica creada exitosamente");
        } catch (err) {
            partialModule.showError(err);
        } finally {
            this.rubric_modal = false;
        }
    }

    openStudentModal(): void {
        this.student_modal = true;
    }

    async onSubmitStudent(student: Student): Promise<void> {
        try {
            const res = await $api.create("student", student.clean());
            const index = this.students.length;
            this.$set(this.students, index, res);
            partialModule.showSuccess("Estudiante creado exitosamente");
        } catch (err) {
            partialModule.showError(err);
        } finally {
            this.student_modal = false;
        }
    }
}
