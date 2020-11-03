import { Component, Vue } from "vue-property-decorator";
import BarChart from "@/components/chart/bar/index.vue";
import PieChart from "@/components/chart/pie/index.vue";
import SpineChart from "@/components/chart/spine/index.vue";
import { ApexOptions } from "apexcharts";
import { colors } from "vuetify/lib";

@Component({
    components: {
        "bar-chart": BarChart,
        "pie-chart": PieChart,
        "spine-chart": SpineChart
    }
})
export default class HomeView extends Vue {
    months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ];

    barchart = {
        series: [
            {
                data: [10, 20, 30, 40],
                name: "Aprobados"
            },
            {
                data: [2, 3, 5, 5],
                name: "Rechazados"
            }
        ] as ApexOptions["series"],
        labels: ["2016", "2017", "2018", "2019"] as string[],
        colors: [colors.teal.lighten2, colors.red.lighten2] as string[]
    };

    barchart2 = {
        series: [
            {
                data: [4, 5, 14, 10],
                name: "Semestre 1"
            },
            {
                data: [6, 15, 16, 30],
                name: "Semestre 2"
            }
        ] as ApexOptions["series"],
        labels: ["2016", "2017", "2018", "2019"] as string[],
        colors: [
            colors.deepPurple.lighten2,
            colors.lightBlue.darken2
        ] as string[]
    };

    piechart = {
        series: [100, 15] as ApexOptions["series"],
        labels: ["Aprobados", "Reprobados"] as string[],
        colors: [colors.teal.lighten2, colors.red.lighten2] as string[]
    };

    spinechart = {
        series: [
            {
                data: [4, 5, 14, 10],
                name: "Semestre 1"
            },
            {
                data: [6, 15, 16, 30],
                name: "Semestre 2"
            }
        ],
        labels: [2016, 2017, 2018, 2019],
        colors: [
            colors.deepPurple.lighten2,
            colors.lightBlue.lighten2
        ] as string[]
    };

    meetchart = {
        series: [36, 16, 27, 32, 28, 9, 13, 24, 18, 27, 6, 4]
    };
}
