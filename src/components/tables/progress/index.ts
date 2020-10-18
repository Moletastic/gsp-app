import { Vue, Component, Prop, Watch, Mixins } from "vue-property-decorator";
import { $debug } from "@/utils/";
import { DataTable } from "@/types/vuetify";
import { Progress, IProgress } from "@/types/core/project";
import CrudTableMixin from "@/components/mixins/crud-table";
import { CRUDService } from "@/api/crud-service";

@Component
export default class ProgressTable extends CrudTableMixin<Progress> {
    @Prop({
        default: () => {
            return new DataTable<Progress>({
                headers: [
                    {
                        text: "ID",
                        value: "id"
                    },
                    {
                        text: "Nombre",
                        value: "name"
                    },
                    {
                        text: "Creado en",
                        value: "created_at"
                    }
                ]
            });
        }
    })
    readonly table!: DataTable<Progress>;

    api = new CRUDService<Progress>("progress");
    entity = new Progress({});

    getNew(): Progress {
        return new Progress({});
    }
}
