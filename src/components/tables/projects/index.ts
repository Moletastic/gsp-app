import { Vue, Component, Prop } from "vue-property-decorator";
import { Project, FmtProjectType } from "@/types/core/project";
import { DataTable } from "@/types/vuetify";

@Component
export default class ProjectTable extends Vue {
    fmt = {
        project_type: FmtProjectType
    };
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

    @Prop({ default: false })
    loading!: boolean;

    check(item: Project): void {
        if (item.id) {
            this.$router.push({
                name: "project",
                params: { id: item.id.toString() }
            });
        }
    }
}
