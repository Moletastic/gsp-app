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
export default class SpineChart extends Vue {
    @Prop({
        default: () => {
            return [{
                name: 'series1',
                data: [31, 40, 28, 51, 42, 109, 100]
              }, {
                name: 'series2',
                data: [11, 32, 45, 32, 34, 52, 41]
              }]
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
            type: "area",
            height: 350,
            toolbar: {
                show: false
            }
        },
        title: {
            text: this.title
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: "smooth"
        },
        xaxis:{
            categories: this.labels
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
