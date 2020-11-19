import Vue from "vue";
import Vuex from "vuex";
import ProjectModule from "./project-module";
import UserModule from "./user-module";
import { ISnackBar } from "@/types/vuetify";
import PartialsModule from "./partials-module";

Vue.use(Vuex);

export interface GSPStore {
    login: boolean;
    sidebar: boolean;
    snack: ISnackBar;
}

const store = new Vuex.Store<GSPStore>({
    state: {
        login: true,
        sidebar: false,
        snack: {
            color: "green",
            message: "",
            close: false
        }
    },
    mutations: {
        signup(state) {
            state.login = false;
        },
        setSnack(state, snack) {
            state.snack = snack;
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
export const partialModule = new PartialsModule({ store, name: "partial" });
export default store;
