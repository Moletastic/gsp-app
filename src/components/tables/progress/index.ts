import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { $debug } from "@/utils/";
import { DataTable } from "@/types/vuetify";
import { Progress, IProgress } from "@/types/core/project";
import moment from "moment";

@Component
export default class ProgressTable extends Vue {
    @Prop({
        default: () => {
            return new DataTable<IProgress>({
                headers: [
                    {
                        text: "Nombre",
                        value: "name"
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
    table!: DataTable<IProgress>;

    progress = new Progress({});

    modal = false;
    modal_mode = "CHECK";
    selected_index = 0;

    onCheckDetail(progress: Progress) {
        this.selected_index = this.table.data.indexOf(progress);
        this.modal_mode = "CHECK";
        this.progress = new Progress(progress);
        this.modal = true;
    }

    drop() {
        this.$delete(this.table.data, this.selected_index);
        this.close();
    }

    editProgress() {
        this.modal_mode = "EDIT";
    }

    update() {
        this.$set(
            this.table.data,
            this.selected_index,
            new Progress(this.progress)
        );
        this.close();
    }

    add() {
        this.progress = new Progress({});
        this.modal_mode = "ADD";
        this.modal = true;
    }

    create() {
        const index = this.table.data.length;
        this.$set(this.table.data, index, new Progress(this.progress));
        this.close();
    }

    close() {
        this.modal = false;
        this.modal_mode = "CHECK";
    }

    moment = moment;
}
