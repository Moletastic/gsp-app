import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { $api } from "@/api";
import {
    LinkType,
    Channel,
    ProjectType,
    ProjectState,
    IProjectType,
    IProjectState,
    ILinkType,
    IChannel,
    Project
} from "@/types/core/project";
import { Rubric, IRubric } from "@/types/core/project/rubric";
import { Career, ICareer } from "@/types/core/education";

type InitialInfo = [
    IProjectType[],
    IProjectState[],
    ILinkType[],
    IRubric[],
    IChannel[],
    ICareer[]
];

export interface ProjectModuleStore {
    project_types: ProjectType[];
    project_states: ProjectState[];
    link_types: LinkType[];
    rubrics: Rubric[];
    channels: Channel[];
    projects: Project[];
}

@Module
export default class ProjectModule extends VuexModule {
    projects: Project[] = [];
    project_types: ProjectType[] = [];
    project_states: ProjectState[] = [];
    link_types: LinkType[] = [];
    rubrics: Rubric[] = [];
    channels: Channel[] = [];
    careers: Career[] = [];

    @Action
    async loadAll(): Promise<void> {
        const results: InitialInfo = await this.fetchAll();
        this.project_types = results[0].map(t => new ProjectType(t));
        this.project_states = results[1].map(s => new ProjectState(s));
        this.link_types = results[2].map(l => new LinkType(l));
        this.rubrics = results[3].map(r => new Rubric(r));
        this.channels = results[4].map(c => new Channel(c));
        this.careers = results[5].map(c => new Career(c));
    }

    @Mutation
    setRubrics(rubrics: IRubric[]): void {
        this.rubrics = rubrics.map(r => new Rubric(r));
    }

    @Mutation
    setLinkTypes(types: LinkType[]): void {
        this.link_types = types.map(t => new LinkType(t));
    }

    @Mutation
    setCareers(careers: Career[]): void {
        this.careers = careers.map(c => new Career(c));
    }

    @Mutation
    setProjects(projects: Project[]): void {
        this.projects = projects.map(p => new Project(p));
    }

    async fetchAll(): Promise<any> {
        const promises: [
            Promise<IProjectType[]>,
            Promise<IProjectState[]>,
            Promise<ILinkType[]>,
            Promise<IRubric[]>,
            Promise<IChannel[]>,
            Promise<ICareer[]>
        ] = [
            $api.get("ptype"),
            $api.get("pstate"),
            $api.get("linktype"),
            $api.get("rubric"),
            $api.get("channel"),
            $api.get("careers")
        ];
        return await Promise.all(promises);
    }
}
