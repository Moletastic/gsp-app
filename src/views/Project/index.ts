import { Component, Vue, Watch } from "vue-property-decorator";
import { $debug } from "@/utils";
import TimeLine from "@/components/timelines/form/index.vue";
import MilestoneForm from "@/components/form/milestone/index.vue";
import MeetForm from "@/components/form/meet/index.vue";
import {
    Project,
    IMilestone,
    Milestone,
    Meet,
    Commit,
    ProjectState,
    FormatProjectState
} from "@/types/core/project";
import Axios, { AxiosResponse } from "axios";
import { $api } from "@/api";
import { DataTable, DataTableHeader, LoopBar, ITimeLineItem } from "@/types/vuetify";
import JSONViewer from "@/components/utils/JsonViewer/index.vue";
import LoadingBar from "@/components/partials/LoadingBar/index.vue";
import MilestonesTable from "@/components/tables/milestone/index.vue";
import MeetTable from "@/components/tables/meet/index.vue";
import CommitTable from "@/components/tables/commit/index.vue";
import DateField from "@/components/fields/date/index.vue";
import TimeField from "@/components/fields/time/index.vue";

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
        DateField,
        TimeField
    }
})
export default class ProjectView extends Vue {
    title: string = "";
    project: Project = new Project();
    icon!: string;

    fmt = FormatProjectState

    states : {key: string, val: string}[] = Object.keys(FormatProjectState).map(state => {
        return {
            key: state,
            val: FormatProjectState[state]
        };
    });

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

    tab = null;

    mounted() {
        this.loading.load();
        this.init();
    }

    async init() {
        const id = this.$route.params["id"];
        $debug("log", id);
        const project = await this.getProject(id);
        if (project) {
            this.project = project;
            this.milestonesTable.data = this.project.milestones;
            this.meetsTable.data = this.project.meets
            this.commitsTable.data = this.project.commits;
        }
        this.loading.unload();
        $debug("log", project?.milestones);
    }

    async getProject(id: string): Promise<Project | null> {
        const project = await $api.fetch<Project>("projects", id);
        return new Project(project);
    }

    get tlmilestones() : ITimeLineItem[]{
        return this.project.milestones.map(milestone => {
            return {
                title: milestone.title,
                date: milestone.date,
                icon: 'mdi-clipboard-list',
                color: 'indigo'
            };
        });
    }

    get tlcommits() : ITimeLineItem[]{
        return this.project.commits.map(com => {
            return {
                title: `${com.title} ${!com.solved ? '- [Sin Resolver]' : ''}`,
                date: com.limit_date,
                icon :'mdi-handshake',
                color: com.solved ? 'deep-purple' : 'grey'
            };
        });
    }

    get tlmeets() : ITimeLineItem[]{
        return this.project.meets.map(meet => {
            return {
                title: meet.name || meet.id,
                date: meet.date,
                icon: 'mdi-calendar',
                color: meet.done ? 'teal' : 'grey'
            };
        });
    }

    get tlitems() : ITimeLineItem[] {
        if(this.tab === "tab-2"){
            return this.tlmilestones
        }
        if(this.tab === "tab-3"){
            return this.tlmeets;
        }
        if(this.tab === "tab-4"){
            return this.tlcommits;
        }
        return this.tlmilestones.concat(this.tlmeets).concat(this.tlcommits);
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

    changeState(state: ProjectState){
        this.project.state = state
    }


}
