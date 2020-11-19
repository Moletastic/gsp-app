<template>
    <v-content>
        <v-container grid-list-md>
            <v-scroll-x-reverse-transition>
                <slot name="content"></slot>
            </v-scroll-x-reverse-transition>
        </v-container>
    </v-content>
</template>
<script src="./index.ts" lang="ts" />
