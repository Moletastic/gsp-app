<template>
    <v-layout wrap>
        <v-flex xs12 v-if="mode == 'ADD' || mode == 'EDIT'">
            <v-layout wrap="">
                <v-flex xs12>
                    <v-text-field
                        :disabled="disabled"
                        outlined
                        :label="disabled ? 'Nombre' : 'Ingresar nombre: '"
                        v-model="form.title"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-textarea
                        :disabled="disabled"
                        outlined
                        v-model="form.desc"
                        :label="
                            disabled ? 'Descripción' : 'Ingresar descripción: '
                        "
                    ></v-textarea>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                        :disabled="disabled"
                        outlined
                        :label="
                            disabled ? 'URL' : 'Ingresar URL de entregable: '
                        "
                        v-model="form.file_url"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <date-field
                        @change="onDate"
                        :disabled="disabled"
                        :label="
                            disabled
                                ? 'Fecha de entrega'
                                : 'Ingresar fecha de entrega: '
                        "
                        :date="form.date"
                    ></date-field>
                </v-flex>
                <v-flex xs12>
                    <v-switch
                        :disabled="disabled"
                        label="Resuelto "
                        color="green"
                        inset
                        v-model="form.solved"
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
                <v-flex xs12 v-if="form.file_url">
                    Link:
                    <a v-if="form.file_url" :href="form.file_url">{{
                        form.file_url
                    }}</a>
                </v-flex>
                <v-flex xs12 v-else="">
                    Sin Link
                </v-flex>
                <v-flex xs12>
                    Fecha
                    <v-chip label v-if="form.date">
                        {{ form.date.format("DD MMMM") }}</v-chip
                    >
                    <v-chip v-else>Sin fecha asociada</v-chip>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>
<script src="./index.ts" lang="ts" />
