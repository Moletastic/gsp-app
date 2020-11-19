<template>
    <v-layout wrap>
        <v-flex xs12 class="d-flex flex-row-reverse">
            <v-btn @click="add" small outlined color="success" right
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
                <template #item.solved="{ item }">
                    <v-icon v-if="item.solved" color="success"
                        >mdi-check-bold</v-icon
                    >
                    <v-icon v-else color="grey">mdi-power-sleep</v-icon>
                </template>
                <template v-slot:[`item.limit_date`]="{ item }">
                    <v-chip>{{ item.limit_date | date }}</v-chip>
                </template>
                <template v-slot:[`item._actions`]="{ item }">
                    <v-btn
                        @click="checkDetails(item)"
                        outlined
                        color="primary"
                        small
                        >revisar</v-btn
                    >
                </template>
            </v-data-table>
        </v-flex>
        <v-flex xs12>
            <v-dialog v-model="modal" width="720px">
                <v-card outlined>
                    <v-card-title>
                        Acuerdo: {{ entity.title }}
                        <v-btn
                            v-if="modal_mode === 'CHECK'"
                            @click="edit"
                            class="ml-5 pl-2"
                            small
                            >Editar</v-btn
                        >
                        <v-btn
                            v-if="modal_mode === 'CHECK'"
                            @click="drop"
                            class="ml-5 pl-2"
                            small
                            >Eliminar</v-btn
                        >
                    </v-card-title>
                    <v-card-text>
                        <commit-form
                            ref="form"
                            :project_id="project_id"
                            :form="entity"
                            :mode="modal_mode"
                            @submit="save"
                        ></commit-form>
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
