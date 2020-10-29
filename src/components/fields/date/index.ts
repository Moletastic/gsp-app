import { Component, Vue, Watch, Prop, Model } from "vue-property-decorator";
import { $debug } from "@/utils";
import moment, { Moment } from "moment";

@Component
export default class DateField extends Vue {
    @Prop({ default: new Date().toISOString() })
    date!: string | null;
    @Prop({ default: "Ingresar Fecha: " })
    label!: string;
    @Prop({ default: false })
    outlined!: boolean;
    @Prop({ default: false })
    disabled!: boolean;

    menu = false;

    date_str: string = this.$moment(this.cdate)
        .format("DD/MM/YYYY")
        .substr(0, 10);
    picker: string = this.cdate.substr(0, 10);

    current = moment(new Date());

    @Watch("date")
    onChange() {
        this.date_str = moment(this.cdate)
            .format("DD/MM/YYYY")
            .substr(0, 10);
        this.picker = this.cdate.substr(0, 10);
    }

    @Watch("date_str")
    onChangeDateStr(date_str: string) {
        $debug("log", date_str);
    }

    mounted() {
        this.date_str = moment(this.cdate)
            .format("DD/MM/YYYY")
            .substr(0, 10);
        this.picker = this.cdate.substr(0, 10);
    }

    allowedDates(val: string) {
        return this.current.valueOf() < moment(val).valueOf();
    }

    @Watch("picker")
    onChangeDate(): void {
        $debug("log", this.picker);
        this.$set(this, "date", moment(this.picker));
        this.date_str = moment(this.cdate)
            .format("DD/MM/YYYY")
            .substr(0, 10);
        this.$emit("change", this.date);
    }

    get cdate(): string {
        return this.date || new Date().toISOString();
    }
}
