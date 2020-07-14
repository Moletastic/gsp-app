<template>
    <v-form>
        <v-layout wrap align-center>
            <v-flex xs8>
                <v-text-field label="Ingresar url: " v-model="form.url"></v-text-field>
            </v-flex>
            <v-flex xs4 class="pl-1">
                <v-select label="Seleccionar tipo de enlace" @select="onSelect" :items="types" item-text="name" v-model="form.type">
                    <template v-slot:selection="{item}">
                        <v-chip small label color="white"><v-icon color="indigo" class="pr-3">{{item.icon}}</v-icon>{{item.name}}</v-chip>
                    </template>
                </v-select>
            </v-flex>
        </v-layout>
    </v-form>
</template>
<script src='./index.ts' lang='ts'/>
