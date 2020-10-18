import { Component, Vue, Watch, Prop, Mixins } from "vue-property-decorator";
import { $debug } from "@/utils";
import { DataTable } from "@/types/vuetify";
import { Milestone } from "@/types/core/project";
import MilestoneForm from "@/components/form/milestone/index.vue";
import CrudTableMixin from "@/components/mixins/crud-table";
import { CRUDService } from "@/api/crud-service";

@Component({
    components: {
        MilestoneForm
    }
})
export default class MilestonesTable extends CrudTableMixin<Milestone> {
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
    readonly table!: DataTable<Milestone>;

    api = new CRUDService<Milestone>("milestone");
    entity = new Milestone({});

    getNew(): Milestone {
        return new Milestone({});
    }
}
