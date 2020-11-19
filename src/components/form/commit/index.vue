<template>
    <v-layout wrap>
        <v-flex xs12 v-if="show_form">
            <v-form ref="form">
                <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field
                            outlined
                            label="Ingresar titulo de acuerdo: "
                            v-model="form.title"
                            :rules="rules.title"
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
                            :rules="rules.limit_date"
                        >
                        </date-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-switch
                            label="Resuelto"
                            v-model="form.solved"
                            @change="changeSolved()"
                            color="success"
                        ></v-switch>
                    </v-flex>
                </v-layout>
            </v-form>
        </v-flex>
        <v-flex xs12 v-else>
            <v-layout wrap>
                <v-flex xs12>
                    <span v-if="form.desc">{{ form.desc }}</span>
                </v-flex>
                <v-flex xs12 class="mb-2" v-if="form.solved_at">
                    Fecha Límite:
                    <v-chip label v-if="form.limit_date">
                        {{ form.limit_date | date }}
                    </v-chip>
                    <v-chip label v-else>Sin fecha</v-chip>
                </v-flex>
                <v-flex xs12 class="mb-2" v-if="form.solved && form.solved_at">
                    Resuelto en:
                    <v-chip label>
                        {{ form.solved_at | date }}
                    </v-chip>
                </v-flex>
                <v-flex xs12 v-if="form.solved">
                    Realizado <v-icon color="success">mdi-check</v-icon>
                </v-flex>
                <v-flex xs12 v-else>
                    No realizado<v-icon color="amber">mdi-weather-night</v-icon>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>
<script src="./index.ts" lang="ts" />
