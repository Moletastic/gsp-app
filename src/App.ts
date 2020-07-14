import { Component, Vue, Watch } from "vue-property-decorator";
import { $debug } from "@/utils";
import SideBar from "@/components/partials/SideBar/index.vue";

@Component({
    components: {
        SideBar
    }
})
export default class App extends Vue {
    logo = require('@/assets/timeline.png')
    toggle() {
        this.$store.commit("toggle_sidebar");
    }
}
