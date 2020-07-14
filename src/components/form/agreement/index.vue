<template>
    <v-card>
        <v-card-title>Formulario Acuerdo</v-card-title>
        <v-card-text>
            <v-layout wrap>
                <v-flex xs12>
                    <v-text-field v-model="form.name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field label="Ingresar fecha límite: " type="date"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-btn :outlined="form.solved ? false : true" :color="form.solved ? 'green' : 'green'" v-text="form.solved ? 'Resuelto' : 'Resolver'" @click="toggleSolved"></v-btn>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>
<script src='./index.ts' lang='ts'/>