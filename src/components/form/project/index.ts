import { Component, Vue, Watch } from "vue-property-decorator";
import { $debug, generateID } from "@/utils";
import {
    Project,
    Subject,
    Link,
    LinkType,
    Milestone
} from "@/types/core/project";
import LinkForm from "@/components/form/link/index.vue";
import DateField from "@/components/fields/date/index.vue";
import TimeLine from "@/components/timelines/form/index.vue";
import StudentForm from "@/components/form/user/student/index.vue";
import TeacherForm from "@/components/form/user/teacher/index.vue";
import { Teacher } from "@/types/core/access/teacher";
import { $api } from "@/api";
import moment, { Moment } from "moment";
import { Student } from "@/types/core/education";

@Component({
    components: { LinkForm, DateField, TimeLine, StudentForm, TeacherForm }
})
export default class ProjectForm extends Vue {
    form = new Project({});
    milestones = 2;
    subjects: Subject[] = [];
    students: Student[] = [];
    teachers: Teacher[] = [];
    linktypes: LinkType[] = [];

    tag = "";
    tags: string[] = [];

    student_modal = false;
    teacher_modal = false;

    private initForm() {
        this.form.subjects = [this.subjects[0]];
    }

    mounted() {
        this.init();
    }

    async init() {
        type ProjectDep = [
            Array<Subject>,
            Array<Student>,
            Array<Teacher>,
            Array<LinkType>
        ];
        const promises: Promise<ProjectDep> = Promise.all([
            $api.get<Subject>("subject"),
            $api.get<Student>("student"),
            $api.get<Teacher>("teacher"),
            $api.get<LinkType>("linktype")
        ]);
        const results = await promises;
        this.subjects = results[0];
        this.students = results[1];
        this.teachers = results[2];
        this.linktypes = results[3];
        this.initForm();
    }

    onSubmit() {
        this.form.tags = this.tags;
        this.$emit("submit", this.form.getClean());
        //$api.create("projects", this.form.getClean());
    }

    enterTag() {
        const tag = this.tag;
        const exists = this.tags.includes(tag);
        if (!exists) {
            this.tags.push(tag);
        }
        this.tag = "";
    }

    removeTag(tag: string) {
        const index = this.tags.indexOf(tag);
        this.$delete(this.tags, index);
    }

    addEmptyLink() {
        this.form.links.push(
            new Link({
                link_type: this.linktypes[0],
                link_type_id: this.linktypes[0].id
            })
        );
    }

    addEmptyMilestone() {
        this.form.milestones.push(new Milestone({ title: "Avance #" }));
    }

    removeMilestone(id: number) {
        const index = this.form.milestones.findIndex(
            milestone => milestone.id === id
        );
        if (index !== -1) {
            this.$delete(this.form.milestones, index);
        }
    }

    onChangeDateMilestone(date: Moment, id: number) {
        const index = this.form.milestones.findIndex(mil => mil.id === id);
        this.form.milestones[index].date = date.toISOString();
    }

    get disabled() {
        return this.form.title === "" || !this.form.title;
    }

    async getLinkTypes(): Promise<LinkType[]> {
        const res = await $api.get<LinkType>("linktype");
        return res;
    }

    get timelineItems() {
        return this.form.milestones.map(milestone => {
            return {
                title: milestone.title,
                date: milestone.date
            };
        });
    }
}
