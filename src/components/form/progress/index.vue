<template>
    <v-layout wrap>
        <v-flex xs12 v-if="mode === 'ADD' || mode === 'EDIT'">
            <v-form ref="form">
            <v-layout wrap>
                <v-flex xs12>
                    <v-text-field
                        outlined
                        label="Ingresar nombre de progreso: "
                        v-model="form.name"
                        :rules="rules.name"
                    ></v-text-field>
                </v-flex>
            </v-layout>

            </v-form>
        </v-flex>
        <v-flex xs12 v-if="mode === 'CHECK'">
            <v-layout wrap>
                <v-flex xs12>
                    <span v-if="form.name">{{ form.name }}</span>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>
<script src="./index.ts" lang="ts" />
