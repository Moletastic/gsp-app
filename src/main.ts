import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "moment/locale/es";
import moment from "moment";
Vue.config.productionTip = false;
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
    render: h => h(App)
}).$mount("#app");
