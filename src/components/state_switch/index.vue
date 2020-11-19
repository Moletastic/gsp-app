<template>
    <v-layout wrap>
        <v-flex xs4>
            <v-chip
                label
                :color="colors[state.name].color"
                :text-color="colors[state.name].text"
                >Estado: {{ state.formated }}
                <v-icon
                    class="ml-2"
                    v-if="state.name === 'CERTIFICATED'"
                    color="amber"
                    >mdi-certificate-outline</v-icon
                ></v-chip
            >
        </v-flex>
        <v-flex xs4>
            <v-layout wrap>
                <v-flex xs12>
                    <v-btn
                        outlined
                        v-for="(opt, i) in options"
                        :key="i"
                        @click="next(opt)"
                        class="mr-2"
                        small
                        :loading="loading"
                    >
                        {{ desc_state[opt.name] }}
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>
<script src="./index.ts" lang="ts" />
