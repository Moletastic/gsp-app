import { Component, Vue } from "vue-property-decorator";
import { $debug } from "@/utils";
import ProjectForm from "@/components/form/project/index.vue";
import { IProject } from "@/types/core/project";
import { $api } from "@/api";
import { partialModule } from "@/store";

@Component({
    components: {
        ProjectForm
    }
})
export default class NewProjectView extends Vue {

    load = false;

    async onSubmit(project: IProject): Promise<void> {
        this.load = true;
        try {
            const res = await $api.create("project", project);
            $debug("log", res);
            partialModule.showSuccess("Proyecto creado exitosamente!")
            this.back();
        } catch (err) {
            $debug("error", err);
            partialModule.showError(err);
        } finally {
            this.load = false;
        }
    }

    back() : void {
        this.$router.push({name: "projects"})
    }
}
