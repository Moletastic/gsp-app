<template>
    <v-card class="elevation-2">
        <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Complete el siguiente formulario</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
            <v-form ref="form">
                <v-text-field
                    v-model="form.first_name"
                    label="Nombres: "
                    :rules="rules.first_name"
                />
                <v-text-field
                    v-model="form.last_name"
                    label="Apellidos: "
                    :rules="rules.last_name"
                />
                <v-text-field
                    v-model="form.nick"
                    label="Nick: "
                    :rules="rules.nick"
                />
                <v-text-field
                    v-model="form.rut"
                    label="RUT: "
                    :rules="rules.rut"
                />
                <v-text-field
                    v-model="form.email"
                    label="Email: "
                    :rules="rules.email"
                />
                <v-text-field
                    v-model="form.password"
                    id="password"
                    label="Contraseña"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="rules.password"
                />
                <v-select
                    :items="user_types"
                    v-model="form.account_type"
                    label="Tipo de Cuenta: "
                    item-value="name"
                    item-text="t"
                    :rules="rules.account_type"
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
