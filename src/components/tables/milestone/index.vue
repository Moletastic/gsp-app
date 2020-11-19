<template>
    <v-layout wrap>
        <v-flex xs12 class="d-flex flex-row-reverse">
            <v-btn small outlined color="success" right @click="add"
                >Agregar<v-icon small right>mdi-plus</v-icon></v-btn
            >
        </v-flex>
        <v-flex xs12>
            <v-data-table
                :headers="table.headers"
                :items="table.data"
                :footer-props="{
                    itemsPerPageText: table.rowsPerPageText
                }"
            >
                <template v-slot:[`item.solved`]="{ item }">
                    <v-icon
                        :color="item.solved ? 'success' : 'grey'"
                        v-text="
                            item.solved ? 'mdi-check-bold' : 'mdi-power-sleep'
                        "
                    ></v-icon>
                </template>
                <template v-slot:[`item.date`]="{ item }">
                    <v-chip>{{ item.date | date }}</v-chip>
                </template>
                <template v-slot:[`item._actions`]="{ item }">
                    <v-btn
                        outlined
                        color="primary"
                        small
                        @click="checkDetails(item)"
                        >revisar</v-btn
                    >
                </template>
            </v-data-table>
        </v-flex>
        <v-flex xs12>
            <v-dialog v-model="modal" width="720px">
                <v-card outlined>
                    <v-card-title
                        >Hito: {{ entity.title }}
                        <v-btn
                            v-if="modal_mode === 'CHECK'"
                            @click="edit()"
                            class="ml-5 pl-2"
                            small
                            >Editar</v-btn
                        >
                        <v-btn
                            v-if="modal_mode === 'CHECK'"
                            @click="drop()"
                            class="ml-5 pl-2"
                            small
                            >Eliminar</v-btn
                        >
                    </v-card-title>
                    <v-card-text>
                        <milestone-form
                            :form="entity"
                            :mode="modal_mode"
                            ref="form"
                            @submit="save"
                        ></milestone-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            @click="submitForm"
                            v-if="modal_mode === 'ADD'"
                            color="primary"
                            >Crear</v-btn
                        >
                        <v-btn
                            @click="submitForm"
                            v-if="modal_mode === 'EDIT'"
                            color="primary"
                            >Guardar</v-btn
                        >
                        <v-btn @click="close" outlined color="grey"
                            >Cerrar</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-flex>
    </v-layout>
</template>
<script src="./index.ts" lang="ts" />
