<template>
    <v-navigation-drawer app clipped v-model="active">
        <v-list dense>
            <v-list-item
                v-for="link in links"
                :key="link.title"
                link
                @click="goTo(link.to)"
            >
                <v-list-item-icon>
                    <v-icon>{{ link.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ link.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
<script src="./index.ts" lang="ts" />
