import { Component, Vue} from "vue-property-decorator";
import { $debug } from "@/utils";
import ProjectForm from "@/components/form/project/index.vue";
import { IProject } from "@/types/core/project";
import { $api } from "@/api";

@Component({
    components: {
        ProjectForm
    }
})
export default class NewProjectView extends Vue {
    async onSubmit(project: IProject) : Promise<void>{
        $debug("log", project);
        try {
            await $api.create("project", project);
        } catch (err) {
            $debug("error", err);
        }
    }
}
