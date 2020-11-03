<template>
    <v-app dark>
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
                <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Ff%2Ff8%2FIcons8_flat_timeline.svg%2F1024px-Icons8_flat_timeline.svg.png&f=1&nofb=1"
          transition="scale-transition"
          width="40"
        />-->
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

        <v-content>
            <v-container grid-list-md>
                <v-scroll-x-reverse-transition>
                    <router-view></router-view>
                </v-scroll-x-reverse-transition>
            </v-container>
        </v-content>
    </v-app>
</template>
<script src="./index.ts" lang="ts" />
