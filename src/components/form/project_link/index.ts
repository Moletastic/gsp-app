import {
    Vue,
    Component,
    Prop,
    Watch,
    Emit,
    Mixins
} from "vue-property-decorator";
import { Link, LinkType } from "@/types/core/project";
import { $api } from "@/api";
import { projectModule } from "@/store";
import { VVal, VForm } from "@/types";
import FormValidation from "@/components/mixins/form-validation";

@Component
export default class ProjectLinkForm extends Mixins(FormValidation) {
    @Prop()
    readonly link!: Link;

    form: Link = new Link({});

    @Watch("link")
    onChange(link: Link): void {
        this.form = link;
    }

    rules: VVal = {
        url: [(val: string) => !!val || "URL Requerida"],
        link_type: [(val: string) => !!val || "Tipo de enlace requerido"]
    };

    mounted(): void {
        this.init();
    }

    async init(): Promise<void> {
        if (!this.link_types || this.link_types.length === 0) {
            const types: LinkType[] = await $api.get("linktype");
            projectModule.setLinkTypes(types);
        }
    }

    onSelectType(obj: LinkType): void {
        this.form.link_type = new LinkType(obj);
        this.form.link_type_id = obj.id;
    }

    onSubmit(): void {
        if (this.validate()) {
            this.sendForm();
        }
    }

    @Emit("change")
    sendForm(): Link {
        return this.form;
    }

    get link_types(): LinkType[] {
        return projectModule.link_types;
    }
}
