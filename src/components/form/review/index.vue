<template>
    <v-form>
        <v-layout wrap align-center>
            <v-flex xs12>
                <v-text-field
                    label="Ingresar nombre de evaluación: "
                    v-model="form.name"
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
                >
                </v-select>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                    label="Ingresar url de archivo: "
                    v-model="form.file_url"
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                    type="number"
                    label="Ingresar nota: "
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-btn @click="onSubmit">Guardar</v-btn>
            </v-flex>
        </v-layout>
    </v-form>
</template>
<script src="./index.ts" lang="ts" />
