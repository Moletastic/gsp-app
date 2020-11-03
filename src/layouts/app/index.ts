import { Component, Vue } from "vue-property-decorator";
import SideBar from "@/components/partials/SideBar/index.vue";

@Component({
    components: {
        SideBar
    }
})
export default class AppLayout extends Vue {
    logo = require("@/assets/timeline.png");
    toggle(): void {
        this.$store.dispatch("toggle_sidebar");
    }
}
