import { Component, Vue } from "vue-property-decorator";
import { $debug } from "@/utils";
import TimeLine from "@/components/timelines/form/index.vue";
import MilestoneForm from "@/components/form/milestone/index.vue";
import MeetForm from "@/components/form/meet/index.vue";
import {
    Project,
    Milestone,
    Meet,
    Commit,
    ProjectState,
    Progress,
    IProjectState,
    Link
} from "@/types/core/project";
import { $api } from "@/api";
import { DataTable, LoopBar, ITimeLineItem } from "@/types/vuetify";
import JSONViewer from "@/components/utils/JsonViewer/index.vue";
import LoadingBar from "@/components/partials/LoadingBar/index.vue";
import MilestonesTable from "@/components/tables/milestone/index.vue";
import MeetTable from "@/components/tables/meet/index.vue";
import CommitTable from "@/components/tables/commit/index.vue";
import DateField from "@/components/fields/date/index.vue";
import TimeField from "@/components/fields/time/index.vue";
import ProgressTable from "@/components/tables/progress/index.vue";
import StateSwitch from "@/components/state_switch/index.vue";
import ProjectLinkForm from "@/components/form/project_link/index.vue";
import { Review } from "@/types/core/project/rubric";
import ReviewForm from "@/components/form/review/index.vue";
import { TokenPayload } from "@/types/core/access";
import { userModule, partialModule } from "@/store";
import { Student, IStudent } from "@/types/core/education";
import { Teacher, ITeacher } from "@/types/core/access/teacher";
import { VVal, VForm } from "@/types";

@Component({
    components: {
        TimeLine,
        MilestoneForm,
        MeetForm,
        "json-viewer": JSONViewer,
        LoadingBar,
        MilestonesTable,
        MeetTable,
        CommitTable,
        ProgressTable,
        DateField,
        TimeField,
        StateSwitch,
        ProjectLinkForm,
        ReviewForm
    }
})
export default class ProjectView extends Vue {
    title = "";
    project: Project = new Project({});
    project_states: ProjectState[] = [];
    icon!: string;

    userDetails = false;
    teacherDetails = false;

    milestone_modal = false;

    selected_entity_id = "";

    loading = new LoopBar();
    load = false;

    rules: VVal = {
        title: [(val: string) => !!val || "Campo requerido"]
    };

    meetsTable = new DataTable<Meet>({
        headers: [
            {
                text: "Nombre",
                value: "name"
            },
            {
                text: "Canal",
                value: "channel"
            },
            {
                text: "Fecha/Hora",
                value: "date"
            },
            {
                text: "Realizada",
                value: "done"
            },
            {
                text: "",
                value: "_actions",
                sortable: false
            }
        ],
        rowsPerPageText: "Reuniones por página"
    });

    milestonesTable = new DataTable<Milestone>({
        headers: [
            {
                text: "Hito",
                value: "title"
            },
            {
                text: "Fecha/Hora",
                value: "date"
            },
            {
                text: "Resuelto",
                value: "solved"
            },
            {
                text: "",
                value: "_actions",
                sortable: false
            }
        ],
        rowsPerPageText: "Hitos por página"
    });

    commitsTable = new DataTable<Commit>({
        headers: [
            {
                text: "Acuerdo",
                value: "title"
            },
            {
                text: "Fecha/Hora",
                value: "limit_date"
            },
            {
                text: "Resuelto",
                value: "solved"
            },
            {
                text: "",
                value: "_actions",
                sortable: false
            }
        ],
        rowsPerPageText: "Acuerdos por página"
    });

    progressTable = new DataTable<Progress>({
        headers: [
            {
                text: "Nombre",
                value: "name"
            },
            {
                text: "Fecha de creación",
                value: "created_at"
            },
            {
                text: "",
                value: "_actions"
            }
        ],
        rowsPerPageText: "Progresos por página"
    });

    tab = "tab-2";

    link_modal = false;
    link_form = new Link({});

    review_modal = false;
    review_form = new Review({});

    students = [] as Student[];
    student_modal = false;
    student_selected = new Student({});

    teachers = [] as Teacher[];
    teacher_modal = false;
    teacher_selected = new Teacher({});

    form = {
        title: "",
        desc: ""
    };

    form_modal = false;

    mounted(): void {
        this.loading.load();
        this.init();
    }

    async init(): Promise<void> {
        const id = this.$route.params["id"];
        const project = await this.getProject(id);
        this.form.desc = this.project.desc;
        this.form.title = this.project.title;
        this.project_states = await this.getProjectStates();
        if (project) {
            this.project = project;
            this.milestonesTable.data = this.project.milestones;
            this.meetsTable.data = this.project.meets;
            this.commitsTable.data = this.project.commits;
            this.progressTable.data = this.project.progress;
        }
        this.loading.unload();
    }

    async selectStudents(): Promise<void> {
        try {
            const students = await $api.get<IStudent>("student");
            this.students = students.map(s => new Student(s));
            this.student_modal = true;
        } catch (err) {
            partialModule.showError(err);
        }
    }

    async addStudent(): Promise<void> {
        this.load = true;
        const project = new Project(this.project);
        const student = this.student_selected;
        project.authors.push(student);
        try {
            const res = await $api.update("project", project.clean());
            $debug("log", res);
            const index = this.project.authors.length;
            this.$set(this.project.authors, index, student);
            partialModule.showSuccess(
                "Estudiante autor agregado correctamente"
            );
        } catch (err) {
            partialModule.showError(err);
        } finally {
            this.student_modal = false;
            this.student_selected = new Student({});
            this.load = false;
        }
    }

    async removeStudent(st: Student): Promise<void> {
        const project = new Project(this.project);
        const student = Object.assign({}, st);
        const index = project.authors.map(a => a.id).indexOf(student.id);
        if (index === -1) {
            return;
        }
        project.authors.splice(index, 1);
        try {
            const res = await $api.update("project", project);
            $debug("log", res);
            this.$delete(this.project.authors, index);
            partialModule.showSuccess(
                "Estudiante autor desvinculado correctamente"
            );
        } catch (err) {
            partialModule.showError(err);
        }
    }

    async selectTeachers(): Promise<void> {
        try {
            const teachers = await $api.get<ITeacher>("teacher");
            this.teachers = teachers.map(t => new Teacher(t));
            $debug("log", teachers);
            this.teacher_modal = true;
        } catch (err) {
            partialModule.showError(err);
        }
    }

    async addTeacher(): Promise<void> {
        const project = new Project(this.project);
        const teacher = this.teacher_selected;
        project.guides.push(teacher);
        try {
            const res = await $api.update("project", project.clean());
            $debug("log", res);
            const index = this.project.guides.length;
            this.$set(this.project.guides, index, teacher);
            partialModule.showSuccess("Docente Guía agregado correctamente");
        } catch (err) {
            partialModule.showError(err);
        } finally {
            this.teacher_modal = false;
            this.teacher_selected = new Teacher({});
        }
    }

    async removeTeacher(guide: Teacher): Promise<void> {
        const project = new Project(this.project);
        const teacher = Object.assign({}, guide);
        const index = project.guides.map(a => a.id).indexOf(teacher.id);
        if (index === -1) {
            return;
        }
        project.guides.splice(index, 1);
        try {
            $debug("log", project.guides);
            const res = await $api.update("project", project.clean());
            $debug("log", res);
            this.$delete(this.project.guides, index);
            partialModule.showSuccess(
                "Docente Guía desvinculado correctamente"
            );
        } catch (err) {
            partialModule.showError(err);
        }
    }

    openEdit(): void {
        this.form.title = this.project.title;
        this.form.desc = this.project.desc;
        this.form_modal = true;
    }

    async patchProject(): Promise<void> {
        if (!this.$refs["patch-form"]) {
            return;
        }
        const form = this.$refs["patch-form"] as VForm;
        if (!form.validate()) {
            return;
        }
        const id = this.project.id as number;
        try {
            await $api.patch("project", id, {
                title: this.form.title,
                desc: this.form.desc,
                project_state_id: this.project.project_state_id
            });
            this.project.title = this.form.title;
            this.project.desc = this.form.desc;
            partialModule.showSuccess("Proyecto Actualizado");
        } catch (err) {
            partialModule.showError(err);
        } finally {
            this.form_modal = false;
        }
    }

    async updateProject(): Promise<void> {
        const project = new Project(this.project);
        try {
            const res = await $api.update("project", project.clean());
            $debug("log", res);
            this.project.title = this.form.title;
            this.project.desc = this.form.desc;
        } catch (err) {
            partialModule.showError(err);
        } finally {
            this.form_modal = false;
        }
    }

    async getProject(id: string): Promise<Project | null> {
        const project = await $api.fetch<Project>("project", id);
        return new Project(project);
    }

    async getProjectStates(): Promise<ProjectState[]> {
        const project_states = await $api.get<IProjectState>("pstate");
        return project_states.map(p => new ProjectState(p));
    }

    get tlmilestones(): ITimeLineItem[] {
        return this.project.milestones.map(milestone => {
            return {
                title: milestone.title,
                date: milestone.date,
                icon: "mdi-clipboard-list",
                color: "indigo"
            };
        });
    }

    get tlcommits(): ITimeLineItem[] {
        return this.project.commits.map(com => {
            return {
                title: `${com.title} ${!com.solved ? "- [Sin Resolver]" : ""}`,
                date: com.limit_date,
                icon: "mdi-handshake",
                color: com.solved ? "deep-purple" : "grey"
            };
        });
    }

    get tlmeets(): ITimeLineItem[] {
        return this.project.meets.map(meet => {
            return {
                title: meet.name,
                date: meet.date,
                icon: "mdi-calendar",
                color: meet.done ? "teal" : "grey"
            };
        });
    }

    get tlprogress(): ITimeLineItem[] {
        return this.project.progress.map(p => {
            return {
                title: p.name,
                color: "teal",
                icon: "mdi-layers-plus",
                date: p.created_at
            };
        });
    }

    get tlitems(): ITimeLineItem[] {
        if (this.tab === "tab-2") {
            return this.tlmilestones;
        }
        if (this.tab === "tab-3") {
            return this.tlmeets;
        }
        if (this.tab === "tab-4") {
            return this.tlcommits;
        }
        if (this.tab === "tab-5") {
            return this.tlprogress;
        }
        return this.tlmilestones
            .concat(this.tlmeets)
            .concat(this.tlcommits)
            .concat(this.tlprogress);
    }

    addLink(): void {
        this.link_modal = true;
        this.link_form = new Link({});
    }

    addReview(): void {
        this.review_form = new Review({});
        this.review_modal = true;
    }

    async onLinkSubmit(link: Link): Promise<void> {
        this.load = true;
        try {
            link.id = null;
            link.project_id = this.project.id as number;
            link.link_type = null;
            const res = await $api.create("link", link);
            this.project.links.push(res);
            partialModule.showSuccess("Enlace agregado correctamente");
        } catch (err) {
            partialModule.showError(err);
        } finally {
            this.load = false;
            this.link_modal = false;
        }
    }

    async removeLink(link: Link): Promise<void> {
        this.load = true;
        try {
            const res = await $api.delete("link", link);
            $debug("log", res);
            const index = this.project.links.map(l => l.id).indexOf(link.id);
            this.project.links.splice(index, 1);
            partialModule.showSuccess("Enlace eliminado correctamente");
        } catch (err) {
            partialModule.showError(err);
        } finally {
            this.load = false;
        }
    }

    async onReviewSubmit(review: Review): Promise<void> {
        try {
            review.id = null;
            review.project_id = this.project.id as number;
            review.project = null;
            if (userModule.user) {
                const user: TokenPayload["user"] = userModule.user;
                const user_type = user.account?.account_type;
                if (user_type === "Teacher") {
                    review.reviewer_id = user.account.id;
                }
            }
            review.rubric = null;
            const res = await $api.create("review", review);
            this.project.reviews.push(res);
            partialModule.showSnack({
                message: "Evaluación Creada",
                close: true,
                color: "success"
            });
        } catch (err) {
            partialModule.showError(err);
        } finally {
            this.review_modal = false;
        }
    }

    async removeReview(review: Review): Promise<void> {
        this.load = true;
        try {
            const res = await $api.delete("review", review);
            $debug("log", res);
            const index = this.project.reviews
                .map(l => l.id)
                .indexOf(review.id);
            this.project.reviews.splice(index, 1);
            partialModule.showSuccess("Evaluación eliminada correctamente");
        } catch (err) {
            partialModule.showError(err);
        } finally {
            this.load = false;
        }
    }

    changeState(state: string): void {
        const index = this.project_states.map(p => p.name).indexOf(state);
        if (index !== -1) {
            const new_state = this.project_states[index];
            this.project.project_state = new ProjectState(new_state);
        }
    }

    async onChangeState(state: ProjectState): Promise<void> {
        this.load = true;
        this.project.project_state = state;
        this.project.project_state_id = state.id as number;
        const id = this.project.id as number;
        try {
            await $api.patch("project", id, {
                title: this.project.title,
                desc: this.project.desc,
                project_state_id: this.project.project_state_id
            });
            partialModule.showSuccess("Proyecto Actualizado");
        } catch (err) {
            partialModule.showError(err);
        }
        this.load = false;
    }

    async save(): Promise<void> {
        const res = await $api.update("project", this.project.getClean());
        $debug("log", res);
    }

    get teachers_selection(): Teacher[] {
        if (!this.teachers || this.teachers.length === 0) {
            return [];
        }
        return this.teachers.filter(
            s => !this.project.guides.map(a => a.id).includes(s.id)
        );
    }

    get students_selection(): Student[] {
        if (!this.students || this.students.length === 0) {
            return [];
        }
        return this.students.filter(
            s => !this.project.authors.map(a => a.id).includes(s.id)
        );
    }
}
