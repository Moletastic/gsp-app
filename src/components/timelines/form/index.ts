import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { $debug } from "@/utils";
import { ITimeLineItem } from "@/types/vuetify";
import moment, { Moment } from "moment";

@Component
export default class TimeLineForm extends Vue {
    @Prop({ default: () => [] })
    items!: ITimeLineItem[];

    @Prop({ default: true })
    addToday!: boolean;

    @Watch("items")
    onChange() {
        $debug("log", this.items);
    }

    current: Omit<ITimeLineItem, "date"> & { date: Moment } = {
        date: moment(new Date()),
        icon: "",
        color: "blue",
        title: "Hoy"
    };

    moment = moment;

    get dated_items() {
        if (this.addToday) {
            return this.items
                .map(it => {
                    return { ...it, date: moment(it.date) };
                })
                .concat(this.current);
        }
        return this.items.map(it => {
            return { ...it, date: moment(it.date) };
        });
    }

    get orderedItems() {
        return this.dated_items.sort(
            (a, b) => b.date.valueOf() - a.date.valueOf()
        );
    }
}
