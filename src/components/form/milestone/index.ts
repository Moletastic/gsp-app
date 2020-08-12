import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { $debug } from "@/utils";
import { Milestone } from "@/types/core/project";
import DateField from "@/components/fields/date/index.vue";
import { Moment } from "moment";
import { Mode } from "@/types/vuetify";

@Component({
    components: {
        DateField
    }
})
export default class MilestoneForm extends Vue {
    @Prop({ default: () => new Milestone() })
    form!: Milestone;

    @Prop({ default: false })
    disabled!: boolean;

    @Prop({ default: "CHECK" })
    mode!: Mode;

    onDate(date: Moment) {
        this.form.date = date;
    }

    save() {
        this.$emit("save", Object.assign(this.form));
    }
}
