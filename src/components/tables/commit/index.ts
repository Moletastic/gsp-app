import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { $debug } from "@/utils";
import { DataTable, Mode } from "@/types/vuetify";
import CommitForm from "@/components/form/commit/index.vue";
import { Commit } from "@/types/core/project";
import moment from "moment";
import { CRUDService } from "@/api/crud-service";

@Component({
    components: {
        CommitForm
    }
})
export default class CommitTable extends Vue {
    @Prop()
    readonly project_id!: number;

    api_service = new CRUDService("commit");

    @Prop({
        default: () => {
            return new DataTable<Commit>({
                headers: [
                    {
                        text: "Acuerdo",
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
                rowsPerPageText: "Acuerdos por página"
            });
        }
    })
    table!: DataTable<Commit>;
    moment = moment;

    commit = new Commit({});

    modal = false;
    modal_mode: Mode = "CHECK";

    selected_index = 0;

    checkDetails(commit: Commit) {
        this.selected_index = this.table.data.indexOf(commit);
        this.modal_mode = "CHECK";
        this.commit = Object.assign({}, commit);
        this.modal = true;
    }

    async drop() {
        const commit = this.table.data[this.selected_index];
        try {
            const result = await this.api_service.delete(commit);
            this.$delete(this.table.data, this.selected_index);
            $debug("log", result);
        } catch (err) {
            $debug("error", err);
        }
        this.close();
    }

    edit() {
        this.modal_mode = "EDIT";
    }

    async update() {
        this.$set(
            this.table.data,
            this.selected_index,
            Object.assign({}, this.commit)
        );
        const commit = this.table.data[this.selected_index];
        commit.project_id = this.project_id;
        try {
            const result = await this.api_service.update(commit);
            $debug("log", result);
        } catch (err) {
            $debug("error", err);
        }
        this.close();
    }

    add() {
        this.commit = new Commit({});
        this.modal_mode = "ADD";
        this.modal = true;
    }

    async create() {
        const index = this.table.data.length;
        this.$set(this.table.data, index, Object.assign({}, this.commit));
        const commit = this.table.data[index];
        $debug("log", commit);
        $debug("log", this.project_id);
        commit.project_id = this.project_id;
        try {
            const result = await this.api_service.create(commit);
            $debug("log", result);
        } catch (err) {
            $debug("error", err);
        }
        this.close();
    }

    close() {
        this.modal = false;
        this.modal_mode = "CHECK";
    }
}
