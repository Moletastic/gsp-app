<template>
    <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Complete el siguiente formulario</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
            <v-form>
                <v-text-field v-model="form.first_name" label="Nombres: " />
                <v-text-field v-model="form.last_name" label="Apellidos: " />
                <v-text-field v-model="form.nick" label="Nick: " />
                <v-text-field v-model="form.rut" label="RUT: " />
                <v-text-field v-model="form.email" label="Email: " />
                <v-text-field
                    v-model="form.password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                />
                <v-select
                    :items="user_types"
                    v-model="form.user_type"
                    label="Tipo de Cuenta: "
                />
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="onSubmit" color="primary">Registrarme</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script src="./index.ts" lang="ts" />
