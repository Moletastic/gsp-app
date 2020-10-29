import { Component, Vue, Watch } from "vue-property-decorator";
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
    ProjectType,
    FmtProjectType,
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

    tab = null;

    link_modal = false;
    link_form = new Link({});

    review_modal = false;
    review_form = new Review({});

    mounted(): void {
        this.loading.load();
        this.init();
    }

    async init(): Promise<void> {
        const id = this.$route.params["id"];
        const project = await this.getProject(id);
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

    checkAuthor(id: string): void {
        this.selected_entity_id = id;
        this.userDetails = true;
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
        try {
            link.id = null;
            link.project_id = this.project.id as number;
            link.link_type = null;
            const res = await $api.create("link", link);
            this.project.links.push(res);
        } catch (err) {
            $debug("error", err);
        } finally {
            this.link_modal = false;
        }
    }

    async removeLink(link: Link): Promise<void> {
        try {
            const res = await $api.delete("link", link);
            $debug("log", res);
            const index = this.project.links.map(l => l.id).indexOf(link.id);
            this.project.links.splice(index, 1);
        } catch (err) {
            $debug("error", err);
        }
    }

    async onReviewSubmit(review: Review): Promise<void> {
        try {
            review.id = null;
            review.project_id = this.project.id as number;
            review.project = null;
            if (this.$store.state.user) {
                const user: TokenPayload["user"] = this.$store.state.user;
                const user_type = user.account?.account_type;
                if (user_type === "Teacher") {
                    review.reviewer_id = user.account.id;
                }
            }
            review.rubric = null;
            const res = await $api.create("review", review);
            this.project.reviews.push(res);
        } catch (err) {
            $debug("error", err);
        } finally {
            this.review_modal = false;
        }
    }

    async removeReview(review: Review): Promise<void> {
        try {
            const res = await $api.delete("review", review);
            $debug("log", res);
            const index = this.project.reviews
                .map(l => l.id)
                .indexOf(review.id);
            this.project.reviews.splice(index, 1);
        } catch (err) {
            $debug("error", err);
        }
    }

    checkTeacher(id: string): void {
        $debug("log", id);
        this.selected_entity_id = id;
        this.teacherDetails = true;
    }

    changeState(state: string): void {
        const index = this.project_states.map(p => p.name).indexOf(state);
        if (index !== -1) {
            const new_state = this.project_states[index];
            this.project.project_state = new ProjectState(new_state);
        }
    }

    async onChangeState(state: ProjectState): Promise<void> {
        this.project.project_state = new ProjectState(state);
        this.project.project_state_id = this.project.project_state.id as number;
        await this.save();
    }

    async save(): Promise<void> {
        const res = await $api.update("project", this.project.getClean());
        $debug("log", res);
    }
}
