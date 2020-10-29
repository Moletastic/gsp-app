<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <signup-form v-if="toggle_form" @submit="signUp"></signup-form>
                <login-form
                    :loading="loading"
                    v-else
                    @submit="login"
                ></login-form>
                <v-btn class="mt-2" @click="toggle_form = !toggle_form">{{
                    toggle_form ? "Ir a Login" : "Crear cuenta"
                }}</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script src="./index.ts" lang="ts" />
