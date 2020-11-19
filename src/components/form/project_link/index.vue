<template>
    <v-form ref="form">
        <v-layout wrap align-center>
            <v-flex xs12>
                <v-text-field
                    label="Ingresar url: "
                    v-model="form.url"
                    :rules="rules.url"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 class="pl-1">
                <v-select
                    label="Seleccionar tipo de enlace"
                    @input="onSelectType"
                    :items="link_types"
                    item-text="name"
                    v-model="link.link_type"
                    :rules="rules.link_type"
                    return-object
                >
                    <template v-slot:selection="{ item }">
                        <v-chip small label color="white"
                            ><v-icon color="indigo" class="pr-3">{{
                                item.icon
                            }}</v-icon
                            >{{ item.name }}</v-chip
                        >
                    </template>
                </v-select>
            </v-flex>
            <v-flex xs12 class="mt-2">
                <v-btn color="primary" @click="onSubmit">Guardar</v-btn>
            </v-flex>
        </v-layout>
    </v-form>
</template>
<script src="./index.ts" lang="ts" />
