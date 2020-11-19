<template>
    <v-card>
        <v-card-title>
            <span class="body-1">Nuevo Estudiante</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
            <v-container grid-list-md class="px-0 mx-0">
                <v-form ref="form">
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
                                                label="Ingresar rut: "
                                                v-model="form.rut"
                                                :rules="rules.rut"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs6></v-flex>
                                        <v-flex xs6>
                                            <v-text-field
                                                outlined
                                                label="Ingresar nombre(s): "
                                                v-model="form.first_name"
                                                :rules="rules.first_name"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-text-field
                                                outlined
                                                label="Ingresar apellido(s): "
                                                v-model="form.last_name"
                                                :rules="rules.last_name"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field
                                                outlined
                                                label="Ingresar Email: "
                                                v-model="form.email"
                                                :rules="rules.email"
                                            ></v-text-field>
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
                                        <v-flex xs6>
                                            <v-select
                                                outlined
                                                label="Seleccionar carrera: "
                                                :items="careers"
                                                item-text="name"
                                                v-model="form.career"
                                                :rules="rules.career"
                                                return-object
                                            ></v-select>
                                        </v-flex>
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
                </v-form>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-btn class="primary" @click="onSubmit">Guardar</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script src="./index.ts" lang="ts" />
