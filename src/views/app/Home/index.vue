<template>
    <v-layout wrap>
        <v-flex xs4>
            <v-card class="black--text">
                <v-card-title class="h3">
                    Estado de Proyectos
                </v-card-title>
            </v-card>
            <v-card class="teal lighten-2 mt-2">
                <v-card-text class="display-1 white--text">
                    En desarrollo
                    <div class="display-2 text-end">36</div>
                </v-card-text>
            </v-card>
            <v-card  class="teal lighten-1 mt-2">
                <v-card-text class="display-1 white--text">
                    En revisión
                    <div class="display-2 text-end">5</div>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs4>
            <v-card height="100%">
                <v-card-title>
                    <span class="h4">Proyectos Aprobados vs Reprobados</span>
                </v-card-title>
                <v-card-text>
                    <bar-chart
                        :series="barchart.series"
                        :labels="barchart.labels"
                        :colors="barchart.colors"
                    ></bar-chart>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs4 >
            <v-card height="100%">
                <v-card-title>
                    <span class="h4">Aprobación Semestral Anual</span>
                </v-card-title>
                <v-card-text>
                    <bar-chart
                        :series="barchart2.series"
                        :labels="barchart2.labels"
                        :colors="barchart2.colors"
                        :stacked="true"
                    ></bar-chart>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs6>
            <v-card height="100%">
                <v-card-title>
                    Aprobación Histórica
                </v-card-title>
                <v-card-text>
                    <pie-chart
                        :series="piechart.series"
                        :labels="piechart.labels"
                        :colors="piechart.colors"
                    ></pie-chart>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs6>
            <v-card>
                <v-card-title> Aprobación Histórica </v-card-title>
            <v-card-text
                ><spine-chart
                    :series="spinechart.series"
                    :labels="spinechart.labels"
                    :colors="spinechart.colors"
                ></spine-chart
            ></v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script src="./index.ts" lang="ts" />
