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
    IProjectState
} from "@/types/core/project";
import Axios, { AxiosResponse } from "axios";
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
        StateSwitch
    }
})
export default class ProjectView extends Vue {
    title: string = "";
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
        rowsPerPageText: "Hitos por página"
    });

    tab = null;

    mounted() {
        this.loading.load();
        this.init();
    }

    async init() {
        const id = this.$route.params["id"];
        const project = await this.getProject(id);
        this.project_states = await this.getProjectStates();
        $debug(
            "log",
            this.project_states.map(p => p.formated)
        );
        if (project) {
            this.project = project;
            this.milestonesTable.data = this.project.milestones;
            this.meetsTable.data = this.project.meets;
            this.commitsTable.data = this.project.commits;
            this.progressTable.data = this.project.progress;
        }
        this.loading.unload();
        $debug("log", project?.milestones);
    }

    async getProject(id: string): Promise<Project | null> {
        $debug("log", "GetProject");
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

    checkAuthor(id: string) {
        this.selected_entity_id = id;
        this.userDetails = true;
    }

    checkTeacher(id: string) {
        $debug("log", id);
        this.selected_entity_id = id;
        this.teacherDetails = true;
    }

    changeState(state: string) {
        const index = this.project_states.map(p => p.name).indexOf(state);
        if (index !== -1) {
            const new_state = this.project_states[index];
            $debug("log", new_state);
            this.project.project_state = new ProjectState(new_state);
            $debug("log", this.project.project_state instanceof ProjectState);
        }
    }

    onChangeState(state: ProjectState) {
        this.project.project_state = new ProjectState(state);
    }
}
