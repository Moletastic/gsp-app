import { Component, Vue } from "vue-property-decorator";
import SideBar from "@/components/partials/SideBar/index.vue";
import TheFooter from "@/components/partials/Footer/index.vue";
import TheMainContainer from "@/components/partials/MainContainer/index.vue";
import { partialModule } from "@/store";

@Component({
    components: {
        SideBar,
        TheFooter,
        TheMainContainer
    }
})
export default class AppLayout extends Vue {
    logo = require("@/assets/timeline.png");
    toggle(): void {
        this.$store.dispatch("toggle_sidebar");
    }
    get show_snack(): boolean {
        return this.snack.show;
    }

    get snack(): typeof partialModule.snack {
        return partialModule.snack;
    }
}
