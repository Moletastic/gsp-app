<template>
    <v-form ref="form">
        <v-layout wrap align-center>
            <v-flex xs12>
                <v-text-field
                    label="Ingresar nombre de evaluación: "
                    v-model="form.name"
                    :rules="rules.name"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 class="pl-1">
                <v-select
                    label="Seleccionar rubrica"
                    @input="onSelectRubric"
                    :items="rubrics"
                    item-text="name"
                    v-model="form.rubric"
                    return-object
                    :hint="rubric_url"
                    :rules="rules.rubric"
                    persistent-hint
                >
                </v-select>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                    label="Ingresar url de archivo: "
                    v-model="form.file_url"
                    :rules="rules.file_url"
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                    type="number"
                    label="Ingresar nota: "
                    v-model="form.score"
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-textarea
                    outlined
                    label="Comentario (opcional):  "
                    v-model="form.comment"
                ></v-textarea>
            </v-flex>
            <v-flex xs12>
                <v-btn color="primary" @click="onSubmit">Guardar</v-btn>
            </v-flex>
        </v-layout>
    </v-form>
</template>
<script src="./index.ts" lang="ts" />
