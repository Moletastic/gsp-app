import { Component, Vue, Prop } from "vue-property-decorator";
import { $debug } from "@/utils";
import { DataTable, Mode } from "@/types/vuetify";
import CommitForm from "@/components/form/commit/index.vue";
import { Commit } from "@/types/core/project";
import moment from "moment";
import { CRUDService } from "@/api/crud-service";
import CrudTableMixin from "@/components/mixins/crud-table";

@Component({
    components: {
        CommitForm
    }
})
export default class CommitTable extends CrudTableMixin<Commit> {
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
    api = new CRUDService<Commit>("commit");
    entity = new Commit({});

    getNew(): Commit {
        return new Commit({});
    }
}
