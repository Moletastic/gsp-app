<template>
    <v-form ref="form">
        <v-layout wrap align-center>
            <v-flex xs12>
                <v-text-field
                    :rules="rules.name"
                    label="Ingresar nombre de rúbrica"
                    v-model="form.name"
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                    :rules="rules.file_url"
                    label="Ingresar url de archivo"
                    v-model="form.file_url"
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-btn color="primary" @click="onSubmit">Guardar</v-btn>
            </v-flex>
        </v-layout>
    </v-form>
</template>
<script src="./index.ts" lang="ts" />
