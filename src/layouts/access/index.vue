<template>
    <v-app>
        <v-snackbar v-model="show_snack" :color="snack.color">{{
            snack.message
        }}</v-snackbar>
        <router-view></router-view>
    </v-app>
</template>
<script src="./index.ts" lang="ts" />
