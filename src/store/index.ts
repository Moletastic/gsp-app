import Vue from "vue";
import Vuex from "vuex";
import {
    Project,
    Subject,
    Meet,
    IProject,
    Milestone
} from "@/types/core/project";
import { generateID } from "@/utils";
import { Teacher } from "@/types/core/access/teacher";
import { User } from "@/types/core/access/user";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        login: true,
        sidebar: false,
        user: {},
        selected_project: new Project({}),
        projects: [] as Array<Project>
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
        }
    },
    actions: {},
    modules: {},
    getters: {}
});
