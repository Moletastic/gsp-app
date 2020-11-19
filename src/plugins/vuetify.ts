import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify, { colors } from "vuetify/lib";
import * as es from "vuetify/es5/locale/es";
import i18n from "@/i18n";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.deepPurple.darken4,
                secondary: colors.yellow.darken1,
                success: colors.teal.accent4,
                error: colors.red.lighten2
            },
            dark: {
                primary: colors.indigo.base
            }
        }
    },
    icons: {
        iconfont: "mdi"
    },
    lang: {
        locales: {
            es
        },
        current: "es",
        t: (key, ...params) => i18n.t(key, params) as string
    }
});
