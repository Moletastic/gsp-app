<template>
    <v-layout wrap>
        <v-flex xs6 class="mb-2">
            <h1 class="headline">Mi Cuenta</h1>
        </v-flex>
        <v-flex xs6></v-flex>
        <v-flex xs6>
            <profile-form
                ref="form"
                :form="form"
                @submit="onSubmit"
            ></profile-form>
            <v-btn
                :loading="loading"
                @click="openModal"
                outlined
                color="primary"
                small
                >Cambiar contraseña
                <v-icon right>mdi-key</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs6></v-flex>
        <v-flex xs6 class="mt-2">
            <v-btn color="primary" :loading="loading" @click="submitForm"
                >Guardar perfil</v-btn
            >
        </v-flex>
        <v-layout wrap>
            <v-dialog v-model="modal" maxWidth="760px">
                <change-password-form
                    @submit="onPasswordSubmit"
                ></change-password-form>
            </v-dialog>
        </v-layout>
    </v-layout>
</template>
<script src="./index.ts" lang="ts" />
