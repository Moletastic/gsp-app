import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "moment/locale/es";
import moment from "moment";
import i18n from "./i18n";
Vue.config.productionTip = true;
Vue.config.silent = true;
Vue.prototype.$moment = moment;

Vue.filter("date", (value: string) => {
    return moment(value).format("DD MMMM");
});

Vue.filter("datetime", (value: string) => {
    return moment(value).format("DD MMMM - HH:mm");
});

new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App)
}).$mount("#app");
