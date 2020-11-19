<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" align="center">
                <v-img :src="logo" width="50px"></v-img>
            </v-col>
            <v-col cols="12" sm="8" md="4">
                <div v-if="toggle_form">
                    <signup-form
                        transition="slide-y-transition"
                        @submit="signUp"
                    ></signup-form>
                </div>
                <div v-else>
                    <login-form :loading="loading" @submit="login"></login-form>
                </div>
                <v-btn
                    outlined
                    class="mt-2"
                    @click="toggle_form = !toggle_form"
                    :loading="loading"
                    >{{ btn_text }}
                    <v-icon
                        small
                        right
                        v-text="toggle_form ? 'mdi-login' : 'mdi-account-plus'"
                    ></v-icon
                ></v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script src="./index.ts" lang="ts" />
