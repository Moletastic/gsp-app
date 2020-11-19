import { Vue, Component, Prop } from "vue-property-decorator";
import { $debug } from "@/utils";
import { DataTable, Mode } from "@/types/vuetify";
import { GSPObject } from "@/types/core/base";
import { CRUDService } from "@/api/crud-service";
import { VForm } from "@/types";
import { partialModule } from "@/store";

class CustomGSPObject extends GSPObject {
    project_id!: number;

    clean(): this {
        return this.clean();
    }
}

export interface GSPForm extends Vue {
    onSubmit(): void;
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
        const entity = Object.assign(
            this.getNew(),
            this.table.data[this.selected_index]
        );
        const obj = entity.clean() as T;
        try {
            const result = await this.api.delete(obj);
            this.$delete(this.table.data, this.selected_index);
            $debug("log", result);
            partialModule.showSuccess("Registro borrado correctamente");
        } catch (err) {
            partialModule.showError(err);
        }
        this.close();
    }

    edit(): void {
        this.modal_mode = "EDIT";
    }

    async update(): Promise<void> {
        const entity = Object.assign(this.getNew(), this.entity);
        entity.project_id = this.project_id;
        const obj = entity.clean();
        try {
            const result = await this.api.update(obj);
            this.$set(this.table.data, this.selected_index, result);
            this.refresh();
            $debug("log", result);
            partialModule.showSuccess("Registro actualizado correctamente");
        } catch (err) {
            partialModule.showError(err);
        }
        this.close();
    }

    refresh(): void {
        $debug("log", "this method should be overwrited");
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
        const entity = Object.assign(this.getNew(), this.entity);
        entity.project_id = this.project_id;
        const obj = entity.clean();
        try {
            const result = await this.api.create(obj);
            $debug("log", result);
            this.$set(this.table.data, index, result);
            partialModule.showSuccess("Registro creado correctamente");
        } catch (err) {
            partialModule.showError(err);
        }
        this.close();
    }

    close(): void {
        this.modal = false;
        this.modal_mode = "CHECK";
    }

    async save(): Promise<void> {
        if (this.modal_mode === "ADD") {
            await this.create();
        }
        if (this.modal_mode === "EDIT") {
            await this.update();
        }
    }

    submitForm(): void {
        if (!this.$refs.form) {
            $debug("log", "Unfound reference");
            return;
        }
        const form = this.$refs.form as GSPForm;
        form.onSubmit();
    }
}
