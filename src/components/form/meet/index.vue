<template>
    <v-form>
        <v-layout wrap>
            <v-flex xs12>
                <v-text-field :disabled="disabled" outlined :label="disabled ? 'Nombre': 'Ingresar nombre: '" v-model="form.name"></v-text-field>
            </v-flex>
            <v-flex xs12>
                <date-field :disabled="disabled" :label="disabled?'Fecha de reunión':'Ingresar fecha de reunión: '" :outlined="true" :date="form.date"></date-field>
            </v-flex>
            <v-flex xs6>
                <v-select :disabled="disabled" :label="disabled ? 'Canal de Comunicación': 'Seleccionar canal de comunicación: '" outlined :items="channels" v-model="form.channel" item-text="name">
                    <template v-slot:selection="{item}" class="ml-0 pl-0">
                        <v-chip :disabled="disabled" class="ml-0 pl-0" label color="white"> <v-img width="30px" class="mr-3" :src="item.icon"></v-img> {{item.name}}</v-chip>
                    </template>
                </v-select>
            </v-flex>
            <v-flex xs12>
                <v-switch class="pl-1" :disabled="disabled" label="Realizada" inset v-model="form.done"></v-switch>
            </v-flex>
        </v-layout>
    </v-form>
</template>
<script src='./index.ts' lang='ts'/>