<template>
    <v-layout wrap>
        <h1><v-icon>mdi-clipboard-pulse</v-icon> Nuevo Proyecto</h1>
        <project-form @submit="onSubmit" class="px-0"></project-form>
    </v-layout>
</template>
<script src="./index.ts" lang="ts" />
