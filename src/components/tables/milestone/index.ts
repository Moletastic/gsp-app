import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { $debug } from "@/utils";
import { DataTable } from "@/types/vuetify";
import { Milestone } from "@/types/core/project";
import MilestoneForm from "@/components/form/milestone/index.vue";
import moment from "moment";

@Component({
    components: {
        MilestoneForm
    }
})
export default class MilestonesTable extends Vue {
    @Prop({
        default: () => {
            return new DataTable<Milestone>({
                headers: [
                    {
                        text: "Hito",
                        value: "title"
                    },
                    {
                        text: "Resuelto",
                        value: "solved"
                    },
                    {
                        text: "",
                        value: "_actions"
                    }
                ],
                rowsPerPageText: "Hitos por página"
            });
        }
    })
    table!: DataTable<Milestone>;

    milestone = new Milestone();

    modal = false;
    modal_mode = "CHECK";
    selected_index = 0;

    onCheckDetail(milestone: Milestone) {
        this.selected_index = this.table.data.indexOf(milestone);
        this.modal_mode = "CHECK";
        this.milestone = Object.assign({}, milestone);
        this.modal = true;
    }

    drop() {
        this.$delete(this.table.data, this.selected_index);
        this.close();
    }

    editMilestone() {
        this.modal_mode = "EDIT";
    }

    update() {
        this.$set(
            this.table.data,
            this.selected_index,
            Object.assign({}, this.milestone)
        );
        this.close();
    }

    add() {
        this.milestone = new Milestone();
        this.modal_mode = "ADD";
        this.modal = true;
    }

    create() {
        const index = this.table.data.length;
        this.$set(this.table.data, index, Object.assign({}, this.milestone));
        this.close();
    }

    close() {
        this.modal = false;
        this.modal_mode = "CHECK";
    }

    moment = moment;
}
