import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { $debug } from "@/utils";
import { ITimeLineItem } from "@/types/vuetify";
import moment, { Moment } from "moment";

export interface MTimeLine extends Omit<ITimeLineItem, "date"> {
    date: Moment;
}

@Component
export default class TimeLineForm extends Vue {
    @Prop({ default: () => [] })
    items!: ITimeLineItem[];

    @Prop({ default: true })
    addToday!: boolean;

    @Watch("items")
    onChange(): void {
        $debug("table", this.items);
    }

    current: MTimeLine = {
        date: moment(new Date()),
        icon: "",
        color: "blue",
        title: "Hoy"
    };

    moment = moment;

    get dated_items(): MTimeLine[] {
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

    get orderedItems(): MTimeLine[] {
        return this.dated_items.sort(
            (a, b) => b.date.valueOf() - a.date.valueOf()
        );
    }
}
