import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { $debug } from "@/utils";
import { ApexOptions } from "apexcharts";
import VueApexCharts from "vue-apexcharts";
import { colors } from "vuetify/lib";

@Component({
    components: {
        "apex-chart": VueApexCharts
    }
})
export default class PieChart extends Vue {
    @Prop({
        default: () => {
            return [44, 55, 13, 43, 22];
        }
    })
    series!: ApexOptions["series"];

    @Prop()
    title!: string;

    @Prop({ default: (): string[] => [] })
    labels!: string[];

    @Prop({ default: (): string[] => [] })
    colors!: string[];

    @Watch("labels")
    onLabelsChanged() {
        if (this.chartOptions.xaxis) {
            $debug("log", this.labels);
            this.chartOptions.xaxis.categories = this.labels;
        }
    }

    @Watch("colors")
    onColorsChanged() {
        this.chartOptions.colors = this.colors;
    }

    chartOptions: ApexOptions = {
        chart: {
            type: "pie",
            height: 350,
            toolbar: {
                show: false
            }
        },
        title: {
            text: this.title
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%"
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"]
        },
        labels: this.labels,
        fill: {
            opacity: 1
        },
        colors: this.colors
        /*         tooltip: {
            y: {
                formatter: function(val) {
                    return "$ " + val + " thousands";
                }
            }
        } */
    };
}
