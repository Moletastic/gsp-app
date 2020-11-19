<template>
    <v-card>
        <v-card-title>
            <span class="body-1">
                <v-chip small color="success"
                    ><v-icon small>mdi-plus</v-icon></v-chip
                >
                Nuevo Tema</span
            >
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
            <v-form ref="form">
                <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field
                            label="Ingresar nombre de tema: "
                            v-model="form.name"
                            :rules="rules.name"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="onSubmit" color="primary">Guardar</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script src="./index.ts" lang="ts" />
