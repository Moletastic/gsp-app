import '@mdi/font/css/materialdesignicons.css' 
import Vue from 'vue';
import Vuetify, { colors } from 'vuetify/lib';
import * as es from 'vuetify/es5/locale/es'

Vue.use(Vuetify);

export default new Vuetify({
    theme : {
        themes : {
            light : {
                primary : colors.indigo.base,
                secondary: colors.yellow.darken1,
                success: colors.green.darken1
            },
            dark: {
                primary: colors.indigo.base
            }
        }
    },
    icons : {
        iconfont: 'mdi'
    },
    lang: {
        locales: {
            es
        },
        current: "es"
    }
});
