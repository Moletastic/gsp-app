import { Component, Prop } from "vue-property-decorator";
import { DataTable } from "@/types/vuetify";
import { Meet, Channel } from "@/types/core/project";
import MeetForm from "@/components/form/meet/index.vue";
import { $api } from "@/api";
import CrudTableMixin from "@/components/mixins/crud-table";
import { CRUDService } from "@/api/crud-service";

@Component({
    components: {
        MeetForm
    }
})
export default class MeetTable extends CrudTableMixin<Meet> {
    @Prop({
        default: () => {
            return new DataTable<Meet>({
                headers: [
                    {
                        text: "Nombre",
                        value: "name"
                    },
                    {
                        text: "Canal",
                        value: "channel"
                    },
                    {
                        text: "Realizada",
                        value: "done"
                    },
                    {
                        text: "",
                        value: "_actions"
                    }
                ],
                rowsPerPageText: "Reuniones por página"
            });
        }
    })
    table!: DataTable<Meet>;

    api = new CRUDService<Meet>("meet");
    entity = new Meet({});
    channels: Channel[] = [];

    mounted(): void {
        this.init();
    }

    async init(): Promise<void> {
        this.channels = await this.getChannels();
    }

    getNew(): Meet {
        return new Meet({});
    }

    async getChannels(): Promise<Channel[]> {
        const data: Array<Channel> = await $api.get("channel");
        return data;
    }

}
