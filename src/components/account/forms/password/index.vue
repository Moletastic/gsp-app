<template>
    <v-card>
        <v-card-title>
            Cambiando Contraseña
        </v-card-title>
        <v-card-text>
            <v-form ref="form">
                <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field
                            label="Ingrese la contraseña actual"
                            v-model="old_password"
                            :rules="rules.old_password"
                            type="password"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                            label="Ingrese la contraseña nueva"
                            v-model="new_password"
                            :rules="rules.new_password"
                            type="password"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                            label="Reingrese su nueva contraseña"
                            v-model="confirm_password"
                            :rules="rules.confirm_password"
                            type="password"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn depressed color="primary" @click="onSubmit"
                >Cambiar contraseña</v-btn
            >
        </v-card-actions>
    </v-card>
</template>
<script src="./index.ts" lang="ts" />
