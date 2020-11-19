import { Vue, Component } from "vue-property-decorator";
import { partialModule } from "@/store";

@Component
export default class AccessLayout extends Vue {
    get show_snack(): boolean {
        return this.snack.show;
    }

    get snack(): typeof partialModule.snack {
        return partialModule.snack;
    }
}
