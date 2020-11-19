<template>
    <v-form ref="form">
        <v-layout wrap v-if="mode === 'ADD' || mode === 'EDIT'">
            <v-flex xs12>
                <v-text-field
                    :disabled="disabled"
                    outlined
                    :label="disabled ? 'Nombre' : 'Ingresar nombre: '"
                    v-model="form.name"
                    :rules="rules.name"
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <date-field
                    :disabled="disabled"
                    :label="
                        disabled
                            ? 'Fecha de reunión'
                            : 'Ingresar fecha de reunión: '
                    "
                    :outlined="true"
                    :date="form.date"
                    @change="onDate"
                ></date-field>
            </v-flex>
            <v-flex xs6>
                <v-select
                    :disabled="disabled"
                    :label="
                        disabled
                            ? 'Canal de Comunicación'
                            : 'Seleccionar canal de comunicación: '
                    "
                    outlined
                    :items="channels"
                    v-model="form.channel"
                    :rules="rules.channel"
                    item-text="name"
                    return-object
                >
                    <template #selection="{ item }" class="ml-0 pl-0">
                        <v-chip
                            :disabled="disabled"
                            class="ml-0 pl-0"
                            label
                            color="white"
                        >
                            <v-img
                                width="30px"
                                class="mr-3"
                                :src="item.icon"
                            ></v-img>
                            {{ item.name }}</v-chip
                        >
                    </template>
                </v-select>
            </v-flex>
            <v-flex xs12>
                <v-switch
                    class="pl-1"
                    :disabled="disabled"
                    label="Realizada"
                    inset
                    color="success"
                    v-model="form.done"
                ></v-switch>
            </v-flex>
        </v-layout>
        <v-layout wrap v-if="mode === 'CHECK'">
            <v-flex xs12 v-if="form.date" class="mb-2">
                Fecha de Reunión:
                <v-chip label> {{ form.date | date }}</v-chip>
            </v-flex>
            <v-flex xs12 v-else>
                <v-chip label>Sin fecha establecida</v-chip>
            </v-flex>
            <v-flex xs6 class="mb-2">
                Canal:
                <v-chip class="ml-2" label>
                    <v-avatar left>
                        <v-img width="10px" :src="form.channel.icon"></v-img>
                    </v-avatar>
                    {{ form.channel.name }}
                </v-chip>
            </v-flex>
            <v-flex xs12 v-if="form.done">
                Realizada <v-icon color="success">mdi-check</v-icon>
            </v-flex>
            <v-flex xs12 v-else>
                No realizada<v-icon color="amber">mdi-weather-night</v-icon>
            </v-flex>
        </v-layout>
    </v-form>
</template>
<script src="./index.ts" lang="ts" />
