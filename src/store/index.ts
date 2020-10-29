import Vue from "vue";
import Vuex from "vuex";
import {
    Project,
    Subject,
    Meet,
    IProject,
    Milestone,
    LinkType
} from "@/types/core/project";
import { generateID } from "@/utils";
import { Teacher } from "@/types/core/access/teacher";
import { User } from "@/types/core/access/user";
import { Rubric } from "@/types/core/project/rubric";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        login: true,
        sidebar: false,
        user: {},
        selected_project: new Project({}),
        projects: [] as Array<Project>,
        link_types: [] as LinkType[],
        rubrics: [] as Rubric[]
    },
    mutations: {
        toggle_sidebar(state) {
            state.sidebar = !state.sidebar;
        },
        set_project(state, project: Project) {
            state.selected_project = project;
        },
        set_projects(state, projects: Project[]) {
            state.projects = projects;
        },
        signup(state) {
            state.login = false;
        },
        set_user(state, user: User) {
            state.user = user;
        },
        set_link_types(state, types) {
            state.link_types = types;
        },
        set_rubrics(state, rubrics) {
            state.rubrics = rubrics;
        }
    },
    actions: {},
    modules: {},
    getters: {}
});
