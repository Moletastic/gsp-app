import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "moment/locale/es";
import moment from "moment";
import i18n from "./i18n";
import Vuelidate from "vuelidate";

Vue.config.productionTip = true;
Vue.config.silent = true;
Vue.prototype.$moment = moment;

Vue.filter("date", (value: string) => {
    if (!value) {
        return "Sin Fecha";
    }
    return moment(value).format("DD MMMM YYYY");
});

Vue.filter("datetime", (value: string) => {
    if (!value) {
        return "Sin Fecha";
    }
    return moment(value).format("DD MMMM YYYY - HH:mm");
});

Vue.use(Vuelidate);

new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App)
}).$mount("#app");
