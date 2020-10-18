import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { $debug } from "@/utils";
import { DataTable, Mode } from "@/types/vuetify";
import { GSPObject, IGSPObject } from "@/types/core/base";
import { CRUDService } from "@/api/crud-service";

class CustomGSPObject extends GSPObject {
    project_id!: number;
}

export interface CrudTableProps<T> {
    project_id: number;
    table: DataTable<T>;
}

@Component
export default class CrudTableMixin<T extends CustomGSPObject> extends Vue {
    @Prop()
    readonly project_id!: number;

    api = new CRUDService<T>("");

    @Prop({
        default: () => {
            return new DataTable<T>({
                headers: []
            });
        }
    })
    readonly table!: DataTable<T>;

    entity!: T;

    modal = false;
    modal_mode: Mode = "CHECK";
    selected_index = 0;

    checkDetails(object: T): void {
        this.selected_index = this.table.data.indexOf(object);
        this.modal_mode = "CHECK";
        this.entity = Object.assign({}, object);
        this.modal = true;
    }

    async drop(): Promise<void> {
        const entity = this.table.data[this.selected_index];
        try {
            const result = await this.api.delete(entity);
            this.$delete(this.table.data, this.selected_index);
            $debug("log", result);
        } catch (err) {
            $debug("error", err);
        }
        this.close();
    }

    edit(): void {
        this.modal_mode = "EDIT";
    }

    async update(): Promise<void> {
        this.$set(
            this.table.data,
            this.selected_index,
            Object.assign({}, this.entity)
        );
        const entity = this.table.data[this.selected_index];
        entity.project_id = this.project_id;
        try {
            const result = await this.api.update(entity);
            $debug("log", result);
        } catch (err) {
            $debug("error", err);
        }
        this.close();
    }

    add(): void {
        this.entity = this.getNew();
        this.modal_mode = "ADD";
        this.modal = true;
    }

    getNew(): T {
        $debug("log", "This method should be overwrited");
        return new GSPObject({}) as T;
    }

    async create(): Promise<void> {
        const index = this.table.data.length;
        this.$set(this.table.data, index, Object.assign({}, this.entity));
        const entity = this.table.data[index];
        entity.project_id = this.project_id;
        try {
            const result = await this.api.create(entity);
            $debug("log", result);
        } catch (err) {
            $debug("error", err);
        }
        this.close();
    }

    close(): void {
        this.modal = false;
        this.modal_mode = "CHECK";
    }
}
