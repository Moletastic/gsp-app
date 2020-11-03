import { Component, Vue, Prop } from "vue-property-decorator";
import { $debug } from "@/utils";
import { Milestone } from "@/types/core/project";
import DateField from "@/components/fields/date/index.vue";
import { Mode } from "@/types/vuetify";

@Component({
    components: {
        DateField
    }
})
export default class MilestoneForm extends Vue {
    @Prop({ default: () => new Milestone({}) })
    form!: Milestone;

    @Prop({ default: 0 })
    project_id!: number;

    @Prop({ default: false })
    disabled!: boolean;

    @Prop({ default: "CHECK" })
    mode!: Mode;

    onDate(date: string): void {
        this.form.date = date;
    }

    save(): void {
        $debug("log", "MilestoneForm save()");
        this.$emit("save", Object.assign(this.form));
    }
}
