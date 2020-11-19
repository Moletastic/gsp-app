<template>
    <v-layout wrap align-center fill-height class="text-center">
        <v-flex xs12>
            <v-timeline dense v-if="items.length > 0">
                <v-timeline-item
                    :color="item.color ? item.color : 'indigo'"
                    :icon="item.icon ? item.icon : 'mdi-calendar-today'"
                    fill-dot
                    right
                    v-for="(item, index) in orderedItems"
                    :key="index"
                >
                    <v-layout wrap>
                        <v-flex xs12 v-if="item.icon">
                            <v-card outlined>
                                <v-card-title>
                                    <span class="text-left body-2">{{
                                        item.title
                                    }}</span>
                                </v-card-title>
                                <v-card-text
                                    class="text-left"
                                    v-if="!item.is_null"
                                    >{{
                                        item.date.format("dddd DD, MMMM") ||
                                            "Desconocida"
                                    }}</v-card-text
                                >
                                <v-card-text class="text-left" v-else>
                                    Sin Fecha
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex xs6 v-else>
                            <v-card outlined>
                                <v-card-title class="text-center body-2">{{
                                    item.title
                                }}</v-card-title>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-timeline-item>
            </v-timeline>
            <span v-else class="subtitle-2">
                Aun no ha registrado ningún Hito
            </span>
        </v-flex>
    </v-layout>
</template>
<script src="./index.ts" lang="ts" />
