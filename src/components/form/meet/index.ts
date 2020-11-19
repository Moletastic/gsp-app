import { Component, Vue, Prop, Emit, Mixins } from "vue-property-decorator";
import { generateID } from "@/utils";
import { Meet, Channel } from "@/types/core/project";
import DateField from "@/components/fields/date/index.vue";
import { Mode } from "@/types/vuetify";
import moment from "moment";
import FormValidation from "@/components/mixins/form-validation";
import { VVal } from "@/types";

@Component({
    components: {
        DateField
    }
})
export default class MeetForm extends Mixins(FormValidation) {
    id = generateID("MEET");

    @Prop({ default: [] })
    channels!: Channel[];

    @Prop({ default: false })
    disabled!: boolean;

    meet_types = ["Presencial", "On-line"];
    meet_type = this.meet_types[1];

    @Prop({ default: 0 })
    project_id!: number;

    @Prop({ default: () => new Meet({}) })
    form!: Meet;

    @Prop({ default: "CHECK" })
    mode!: Mode;

    rules: VVal = {
        name: [(val: string) => !!val || "Nombre requerido"],
        channel: [
            (val: Channel) => !!val || "Canal requerido",
            (val: Channel) => !!val.id || "Canal requerido"
        ]
    };

    onDate(date: string): void {
        this.form.date = date;
    }

    moment = moment;

    onSubmit(): void {
        if (this.validate()) {
            this.sendForm();
        }
    }

    @Emit("submit")
    sendForm(): Meet {
        return new Meet(this.form);
    }
}
