import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator";
import { Link, LinkType } from "@/types/core/project";
import { $api } from "@/api";
import { projectModule } from "@/store";

@Component
export default class ProjectLinkForm extends Vue {
    @Prop()
    readonly link!: Link;

    form: Link = new Link({});

    @Watch("link")
    onChange(link: Link): void {
        this.form = link;
    }

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

    @Emit("change")
    onSubmit(): Link {
        return this.form;
    }

    get link_types(): LinkType[] {
        return projectModule.link_types;
    }
}
