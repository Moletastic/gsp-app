<template>
    <v-form ref="form">
        <v-layout wrap>
            <v-flex xs12>
                <v-text-field
                    label="Nombre(s)"
                    outlined
                    v-model="form.first_name"
                    :rules="rules.first_name"
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                    label="Apellido(s)"
                    outlined
                    v-model="form.last_name"
                    :rules="rules.last_name"
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                    label="Email"
                    outlined
                    v-model="form.email"
                    :rules="rules.email"
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                    label="Nick"
                    outlined
                    v-model="form.nick"
                    :rules="rules.nick"
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                    label="Rut"
                    outlined
                    v-model="form.rut"
                    :rules="rules.rut"
                    hint="Sin puntos, con guión"
                    persistent-hint
                ></v-text-field>
            </v-flex>
        </v-layout>
    </v-form>
</template>
<script src="./index.ts" lang="ts" />
