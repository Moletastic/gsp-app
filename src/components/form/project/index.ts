import { Component, Vue, Mixins, Emit, Prop } from "vue-property-decorator";
import {
    Project,
    Subject,
    Link,
    LinkType,
    Milestone,
    ProjectType,
    IProjectType,
    ILinkType,
    ISubject
} from "@/types/core/project";
import LinkForm from "@/components/form/link/index.vue";
import DateField from "@/components/fields/date/index.vue";
import TimeLine from "@/components/timelines/form/index.vue";
import StudentForm from "@/components/form/user/student/index.vue";
import TeacherForm from "@/components/form/user/teacher/index.vue";
import SubjectForm from "@/components/form/subject/index.vue";
import { Teacher } from "@/types/core/access/teacher";
import { $api } from "@/api";
import { Moment } from "moment";
import { Student } from "@/types/core/education";
import { ITimeLineItem } from "@/types/vuetify";
import { $debug } from "@/utils";
import { partialModule } from "@/store";
import { VVal } from "@/types";
import FormValidation from "@/components/mixins/form-validation";

@Component({
    components: {
        LinkForm,
        DateField,
        TimeLine,
        StudentForm,
        TeacherForm,
        SubjectForm
    }
})
export default class ProjectForm extends Mixins(FormValidation) {
    form = new Project({});
    milestones = 2;
    subjects: Subject[] = [];
    project_types: ProjectType[] = [];
    students: Student[] = [];
    teachers: Teacher[] = [];
    linktypes: LinkType[] = [];

    tag = "";
    tags: string[] = [];

    @Prop({ default: false })
    load!: boolean;

    loading = false;

    student_modal = false;
    teacher_modal = false;
    subject_modal = false;

    subject = new Subject({
        name: "",
        icon: "mdi-creation"
    });

    seq_milestone = 1;
    seq_links = 1;

    private initForm() {
        this.form.subjects = [this.subjects[0]];
    }

    rules: VVal = {
        name: [(val: string) => !!val || "Nombre requerido"],
        project_type: [(val: any) => !!val || "Tipo de proyecto requerido"],
        subjects: [
            (subjects: Subject[]) =>
                subjects.length !== 0 || "Se requiere de al menos 1 tema"
        ],
        guides: [
            (teachers: Teacher[]) =>
                teachers.length !== 0 ||
                "Se requiere al menos a 1 profesor guía"
        ],
        authors: [
            (students: Student[]) =>
                students.length !== 0 ||
                "Se requiere al menos a 1 estudiante autor"
        ]
    };

    mounted(): void {
        this.init();
    }

    async init(): Promise<void> {
        type ProjectDep = [
            Array<Subject>,
            Array<Student>,
            Array<Teacher>,
            Array<LinkType>,
            Array<ProjectType>
        ];
        this.loading = true;
        try {
            const promises: Promise<any> = Promise.all([
                $api.get<Subject>("subject"),
                $api.get<Student>("student"),
                $api.get<Teacher>("teacher"),
                $api.get<LinkType>("linktype"),
                $api.get<ProjectType>("ptype")
            ]);
            const results = await promises;
            this.subjects = results[0];
            this.students = results[1];
            this.teachers = results[2];
            this.linktypes = results[3].map((l: ILinkType) => new LinkType(l));
            this.project_types = results[4].map(
                (p: IProjectType) => new ProjectType(p)
            );
            this.initForm();
        } catch (err) {
            partialModule.showError(err);
            $debug("error", err);
        } finally {
            this.loading = false;
        }
    }

    onSubmit(): void {
        if (this.validate()) {
            this.sendForm();
        }
    }

    @Emit("submit")
    sendForm(): Project {
        return this.form.creatable();
    }

    enterTag(): void {
        const tag = this.tag;
        const exists = this.tags.includes(tag);
        if (!exists) {
            this.tags.push(tag);
        }
        this.tag = "";
    }

    removeTag(tag: string): void {
        const index = this.tags.indexOf(tag);
        this.$delete(this.tags, index);
    }

    openSubjectModal(): void {
        this.subject_modal = true;
    }

    async onSubmitSubject(subject: Subject): Promise<void> {
        try {
            const res = await $api.create("subject", subject);
            $debug("log", res);
            partialModule.showSuccess("Tema creado exitosamente");
            const subjects = await $api.get<Subject>("subject");
            this.subjects = subjects.map(s => new Subject(s));
        } catch (err) {
            partialModule.showError(err);
        } finally {
            this.subject_modal = false;
        }
    }

    addEmptyLink(): void {
        const index = this.form.links.length;
        const link = new Link({
            id: this.seq_links++,
            link_type: this.linktypes[0],
            link_type_id: this.linktypes[0]?.id || null
        });
        this.$set(this.form.links, index, link);
    }

    addEmptyMilestone(): void {
        const index = this.form.milestones.length;
        const milestone = new Milestone({
            id: this.seq_milestone++,
            title: "Avance #"
        });
        this.$set(this.form.milestones, index, milestone);
    }

    removeMilestone(id: number): void {
        const index = this.form.milestones.findIndex(
            milestone => milestone.id === id
        );
        if (index !== -1) {
            this.$delete(this.form.milestones, index);
        }
    }

    onChangeDateMilestone(date: Moment, id: number): void {
        $debug("log", "id: " + id);
        const index = this.form.milestones.findIndex(mil => mil.id === id);
        if (index !== -1) {
            this.form.milestones[index].date = date.toISOString();
        }
    }

    get disabled(): boolean {
        return this.form.title === "" || !this.form.title;
    }

    async getLinkTypes(): Promise<LinkType[]> {
        const res = await $api.get<LinkType>("linktype");
        return res;
    }

    get timelineItems(): ITimeLineItem[] {
        return this.form.milestones.map(milestone => {
            return {
                title: milestone.title,
                date: milestone.date,
                icon: "mdi-calendar",
                color: "primary"
            };
        });
    }
}
