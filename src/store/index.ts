import Vue from "vue";
import Vuex from "vuex";
import ProjectModule from "./project-module";
import UserModule from "./user-module";

Vue.use(Vuex);

export interface GSPStore {
    login: boolean;
    sidebar: boolean;
}

const store = new Vuex.Store<GSPStore>({
    state: {
        login: true,
        sidebar: false
    },
    mutations: {
        signup(state) {
            state.login = false;
        }
    },
    actions: {
        toggle_sidebar({ state }) {
            state.sidebar = !state.sidebar;
        }
    },
    getters: {}
});

export const userModule = new UserModule({ store, name: "access" });
export const projectModule = new ProjectModule({ store, name: "project" });
export default store;
