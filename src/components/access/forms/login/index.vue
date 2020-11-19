<template>
    <v-card class="elevation-2">
        <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Ingrese con sus credenciales</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
            <v-form ref="form">
                <v-text-field
                    v-model="form.email"
                    label="Email"
                    name="email"
                    :rules="rules.email"
                    prepend-icon="mdi-account"
                    type="email"
                ></v-text-field>
                <v-text-field
                    v-model="form.password"
                    id="password"
                    label="Contraseña"
                    name="password"
                    :rules="rules.password"
                    prepend-icon="mdi-lock"
                    type="password"
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :loading="loading" @click="onSubmit" color="primary"
                >Logearme</v-btn
            >
        </v-card-actions>
    </v-card>
</template>
<script src="./index.ts" lang="ts" />
