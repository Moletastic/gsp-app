<template>
    <v-layout wrap>
        <v-flex xs12 v-if="mode === 'ADD' || mode === 'EDIT'">
            <v-layout wrap>
                <v-flex xs12>
                    <v-text-field
                        outlined
                        label="Ingresar titulo de acuerdo: "
                        v-model="form.title"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-textarea
                        outlined
                        label="Ingresar descripción de acuerdo: "
                        v-model="form.desc"
                    ></v-textarea>
                </v-flex>
                <v-flex xs12>
                    <date-field
                        @change="onDate"
                        :disabled="disabled"
                        :date="form.limit_date"
                        :label="label"
                    >
                    </date-field>
                </v-flex>
                <v-flex xs12>
                    <v-switch
                        label="Resuelto"
                        v-model="form.solved"
                        @change="changeSolved()"
                    ></v-switch>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 v-if="mode === 'CHECK'">
            <v-layout wrap>
                <v-flex xs12>
                    <span v-if="form.desc">{{ form.desc }}</span>
                    <span v-else>Sin Descripción</span>
                </v-flex>
                <v-flex xs12 class="mb-2" v-if="form.solved_at">
                    <v-chip label>
                        Fecha Límite: {{ form.limit_date.format("DD MMMM") }}
                    </v-chip>
                </v-flex>
                <v-flex xs12 class="mb-2" v-if="form.solved && form.solved_at">
                    <v-chip label>
                        Resuelto en: {{ form.solved_at.format("DD MMMM") }}
                    </v-chip>
                </v-flex>
                <v-flex xs12 class="mb-2" v-if="form.solved">
                    <v-chip label class="green white--text">Resuelto</v-chip>
                </v-flex>
                <v-flex xs12 v-else>
                    <v-chip label>Sin Resolver</v-chip>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>
<script src="./index.ts" lang="ts" />
