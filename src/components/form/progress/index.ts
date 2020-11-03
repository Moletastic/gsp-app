import { Vue, Component, Prop} from "vue-property-decorator";
import { Progress } from "@/types/core/project";
import { Mode } from "@/types/vuetify";

@Component
export default class ProgressForm extends Vue {
    @Prop({ default: () => new Progress({}) })
    form!: Progress;

    @Prop({ default: 0 })
    project_id!: number;

    @Prop({ default: false })
    disabled!: boolean;

    @Prop({ default: "CHECK" })
    mode!: Mode;
}
