import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { $debug } from "@/utils";
import { $api } from "@/api";

interface TLObject {
    id: string;
}

@Component
export default class JSONViewer extends Vue {
    @Prop()
    readonly entity!: string;
    @Prop()
    readonly entity_id!: string;
    @Prop()
    readonly verbose!: string;

    title = "";
    desc = "";

    mapping: { [key: string]: string } = {
        students: "Estudiante",
        teachers: "Profesor"
    };

    @Watch("entity_id")
    onEntityChanged(): void {
        this.init();
    }

    mounted(): void {
        this.init();
    }

    async init(): Promise<void> {
        let name = this.entity_id;
        try {
            const obj: any = await $api.fetch(this.entity, this.entity_id);
            if (this.verbose === "user") {
                name = obj.user.nick;
            } else if (`${this.verbose}` in obj) {
                name = "" + obj[<keyof TLObject>this.verbose];
            }
            const fields = JSON.stringify(obj, undefined, 2);
            this.desc = fields;
        } catch (err) {
            $debug("error", err);
            this.desc = "No se ha encontrado un registro asociado";
        }
        this.title = `${this.mapping[this.entity]} : ${name}`;
    }
}
