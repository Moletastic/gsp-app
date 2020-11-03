import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import {
    ProjectState,
    IProjectState,
    FmtProjectState
} from "@/types/core/project";
import { $api } from "@/api";

type PState = keyof typeof FmtProjectState;

const colorState: { [key in PState]: { color: string; text: string } } = {
    CREATED: {
        color: "white",
        text: "black"
    },
    STARTED: {
        color: "white",
        text: "black"
    },
    IN_PROGRESS: {
        color: "indigo lighten-5",
        text: "black"
    },
    PRESENTED: {
        color: "indigo lighten-4",
        text: "black"
    },
    CHECKED: {
        color: "indigo lighten-3",
        text: "black"
    },
    APPROVED: {
        color: "indigo lighten-2",
        text: "white"
    },
    IN_PROGRESS2: {
        color: "indigo darken-1",
        text: "white"
    },
    PRESENTED2: {
        color: "indigo darken-2",
        text: "white"
    },
    APPROVED2: {
        color: "indigo darken-3",
        text: "white"
    },
    REJECTED: {
        color: "red darken-1",
        text: "black"
    },
    FINISHED: {
        color: "indigo darken-4",
        text: "white"
    },
    CERTIFICATED: {
        color: "deep-purple darken-1",
        text: "white"
    }
};

const DescState = {
    CREATED: "Crear",
    STARTED: "Iniciar",
    IN_PROGRESS: "Desarrollar",
    PRESENTED: "Presentar",
    CHECKED: "Revisar",
    APPROVED: "Aprobar",
    IN_PROGRESS2: "Pasar a Semestre 2",
    PRESENTED2: "Presentar",
    APPROVED2: "Aprobar",
    REJECTED: "Rechazar",
    FINISHED: "Terminar",
    CERTIFICATED: "Registrar Titulación"
};

@Component
export default class StateSwitch extends Vue {
    @Prop()
    state!: ProjectState;

    desc_state = DescState;
    colors = colorState;

    states: ProjectState[] = [];

    options: ProjectState[] = [];

    @Watch("state")
    onChange(): void {
        this.refreshOptions();
    }

    mounted(): void {
        this.init();
    }

    async init(): Promise<void> {
        this.states = await this.getProjectStates();
        this.refreshOptions();
    }

    async getProjectStates(): Promise<ProjectState[]> {
        const states = await $api.get<IProjectState>("pstate");
        return states.map(p => new ProjectState(p));
    }

    refreshOptions(): void {
        switch (this.state.name) {
            case "IN_PROGRESS":
                this.options = this.changeOptions(["PRESENTED"]);
                break;
            case "PRESENTED":
                this.options = this.changeOptions(["CHECKED"]);
                break;
            case "CHECKED":
                this.options = this.changeOptions(["APPROVED", "REJECTED"]);
                break;
            case "APPROVED":
                this.options = this.changeOptions(["IN_PROGRESS2"]);
                break;
            case "IN_PROGRESS2":
                this.options = this.changeOptions(["PRESENTED2"]);
                break;
            case "PRESENTED2":
                this.options = this.changeOptions(["APPROVED2", "REJECTED"]);
                break;
            case "REJECTED":
                this.options = [];
                break;
            case "APPROVED2":
                this.options = this.changeOptions(["FINISHED"]);
                break;
            case "FINISHED":
                this.options = this.changeOptions(["CERTIFICATED"]);
                break;
            case "CERTIFICATED":
                this.options = [];
                break;
        }
    }

    changeOptions(states: PState[]): ProjectState[] {
        const options = states.map(s => {
            return this.states[this.state_names.indexOf(s)];
        });
        return options;
    }

    get state_names(): string[] {
        return this.states.map(state => state.name);
    }

    next(state: ProjectState): void {
        this.$emit("change", new ProjectState(state));
    }
}
