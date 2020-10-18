import { Component, Vue, Watch } from "vue-property-decorator";
import { $debug } from "@/utils";
import MainLayout from "@/layouts/app/index.vue";
import AccessLayout from "@/layouts/access/index.vue";
import { VueConstructor } from "vue";

@Component({
    components: {
        MainLayout,
        AccessLayout
    }
})
export default class App extends Vue {
    get layout(): VueConstructor<Vue> {
        return this.render_login ? AccessLayout : MainLayout;
    }

    get render_login(): boolean {
        return this.$store.state.login;
    }
}
