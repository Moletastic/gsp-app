<template>
    <v-layout wrap>
        <v-flex xs6>
            <v-layout wrap>
                <v-flex xs12>
                    <h3>Datos Personales</h3>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                        label="Nombre(s)"
                        outlined
                        v-model="user.first_name"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                        label="Apellido(s)"
                        outlined
                        v-model="user.last_name"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                        label="Email"
                        outlined
                        v-model="user.email"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                        label="Nick"
                        outlined
                        v-model="user.nick"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                        label="Rut"
                        outlined
                        v-model="user.rut"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-btn outlined @click="openModal"
                        >Cambiar mi contraseña</v-btn
                    >
                </v-flex>
            </v-layout>
        </v-flex>
        <v-layout wrap>
            <v-dialog v-model="modal" maxWidth="760px">
                <v-card>
                    <v-card-title>
                        Cambiando Contraseña
                    </v-card-title>
                    <v-card-text>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field
                                    label="Ingrese la contraseña actual"
                                    v-model="old_password"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                    label="Ingrese la contraseña nueva"
                                    v-model="new_password"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                    label="Reingrese su nueva contraseña"
                                    v-model="confirm_password"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn depressed color="primary"
                            >Cambiar contraseña</v-btn
                        >
                        <v-btn @click="modal = false" outlined>Cancelar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </v-layout>
</template>
<script src="./index.ts" lang="ts" />
