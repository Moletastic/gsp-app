import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { $debug } from "@/utils";
import { Project } from "@/types/core/project";
import { DataTable } from "@/types/vuetify";

@Component
export default class ProjectTable extends Vue {
    @Prop({
        default: () => {
            return new DataTable<Project>({
                headers: [
                    {
                        text: "Título",
                        value: "title"
                    },
                    {
                        text: "Tipo",
                        value: "project_type"
                    },
                    {
                        text: "Hecho por",
                        value: "authors"
                    },
                    {
                        text: "Guiado Por",
                        value: "guides"
                    },
                    {
                        text: "Acciones",
                        value: "_actions"
                    }
                ],
                rowsPerPageText: "Hitos por página"
            });
        }
    })
    table!: DataTable<Project>;

    check(item: Project) {
        if (item.id) {
            this.$router.push({
                name: "project",
                params: { id: item.id.toString() }
            });
        }
    }
}