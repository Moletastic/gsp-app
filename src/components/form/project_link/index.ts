import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { $debug } from "@/utils/";
import { Link, LinkType } from "@/types/core/project";
import { $api } from "@/api";

@Component
export default class ProjectLinkForm extends Vue {
    @Prop()
    readonly link!: Link;

    form: Link = new Link({});

    @Watch("link")
    onChange(link: Link) {
        this.form = link;
    }

    mounted() {
        this.init();
    }

    async init() {
        if (!this.link_types || this.link_types.length === 0) {
            const types: LinkType[] = await $api.get("linktype");
            this.$store.commit("set_link_types", types);
        }
    }

    onSelectType(obj: LinkType) {
        this.form.link_type = new LinkType(obj);
        this.form.link_type_id = obj.id;
    }

    onSubmit() {
        this.$emit("change", this.form);
    }

    get link_types(): LinkType[] {
        return this.$store.state.link_types as LinkType[];
    }
}
