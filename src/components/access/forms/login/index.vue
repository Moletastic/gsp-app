<template>
    <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Ingrese con sus credenciales</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
            <v-form>
                <v-text-field
                    v-model="form.email"
                    label="Email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="email"
                ></v-text-field>

                <v-text-field
                    v-model="form.password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="onSubmit" color="primary">Logearme</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script src="./index.ts" lang="ts" />
