<template>
    <v-container grid-list-md class="px-0 mx-0">
        <v-layout wrap>
            <v-flex xs12>
                <v-card outlined>
                    <v-card-title>
                        <span class="body-2">Datos Personales</span>
                    </v-card-title>
                    <v-card-text class="pb-0">
                        <v-layout wrap align-center>
                            <v-flex xs6>
                                <v-text-field
                                    outlined
                                    label="Ingresar nombre(s): "
                                    v-model="form.account.first_name"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs6>
                                <v-text-field
                                    outlined
                                    label="Ingresar apellido(s): "
                                    v-model="form.account.last_name"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                    outlined
                                    label="Ingresar Email: "
                                    v-model="form.account.email"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs6>
                                <v-text-field
                                    outlined
                                    label="Ingresar nick: "
                                    v-model="form.account.nick"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs2 class="pb-5">
                                <v-btn
                                    small
                                    outlined
                                    color="primary"
                                    @click="generateNick"
                                    >Generar nick</v-btn
                                >
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12>
                <v-card outlined>
                    <v-card-title>
                        <span class="body-2">Datos académicos</span>
                    </v-card-title>
                    <v-card-text class="pb-0">
                        <v-layout wrap>
                            <v-flex xs3>
                                <v-text-field
                                    outlined
                                    label="Ingresar año de entrada: "
                                    type="number"
                                    v-model="form.entry_year"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script src="./index.ts" lang="ts" />
