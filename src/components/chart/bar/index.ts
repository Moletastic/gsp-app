import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { ApexOptions } from "apexcharts";
import VueApexCharts from "vue-apexcharts";

@Component({
    components: {
        "apex-chart": VueApexCharts
    }
})
export default class BarChart extends Vue {
    @Prop({
        default: () => {
            return [
                {
                    name: "Net Profit",
                    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
                }
            ];
        }
    })
    series!: ApexOptions["series"];

    @Prop()
    ytitle!: string;

    @Prop()
    title!: string;

    @Prop({ default: (): string[] => [] })
    labels!: string[];

    @Prop({ default: (): string[] => [] })
    colors!: string[];

    @Prop()
    stacked!: boolean;

    @Watch("labels")
    onLabelsChanged(): void {
        if (this.chartOptions.xaxis) {
            this.chartOptions.xaxis.categories = this.labels;
        }
    }

    @Watch("colors")
    onColorsChanged(): void {
        this.chartOptions.colors = this.colors;
    }

    chartOptions: ApexOptions = {
        chart: {
            type: "bar",
            height: 350,
            stacked: this.stacked,
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
        xaxis: {
            categories: this.labels
        },
        yaxis: {
            title: {
                text: this.ytitle
            }
        },
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
