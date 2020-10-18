import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { $debug } from "@/utils";
import { Link, LinkType } from "@/types/core/project";

@Component
export default class LinkForm extends Vue {
    @Prop()
    types!: LinkType[];

    @Prop({ default: () => new Link({}) })
    form!: Link;

    @Prop({ default: 0 })
    project_id!: number;

    onSelect(obj: LinkType) {
        this.form.link_type = obj;
        this.form.link_type_id = obj.id;
    }
}
