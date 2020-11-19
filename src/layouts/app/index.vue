<template>
    <v-app dark>
        <v-snackbar
            fixed
            top
            v-model="show_snack"
            :color="snack.color"
            :text="true"
            >{{ snack.message }}</v-snackbar
        >
        <side-bar></side-bar>
        <v-app-bar
            app
            color="white"
            :style="{ color: 'black' }"
            clipped-left
            flat
        >
            <v-app-bar-nav-icon @click="toggle"></v-app-bar-nav-icon>
            <div class="d-flex align-center px-2">
                <v-btn class="ma-2" tile depressed color="white">
                    <v-img
                        alt="Vuetify Logo"
                        class="shrink mr-2"
                        contain
                        transition="scale-transition"
                        width="40"
                        :src="logo"
                    />UTEM GSP
                </v-btn>
            </div>

            <v-spacer></v-spacer>
        </v-app-bar>
        <the-main-container>
            <template v-slot:content>
                <router-view></router-view>
            </template>
        </the-main-container>
        <the-footer></the-footer>
    </v-app>
</template>
<script src="./index.ts" lang="ts" />
