<template>
    <v-layout wrap>
        <v-flex xs12>
            <h1 class="headline">Proyectos</h1>
            <v-switch
                inset
                label="Búsqueda por filtro"
                v-model="filtered"
            ></v-switch>
        </v-flex>
        <v-slide-y-transition>
            <v-flex xs12 v-if="filtered">
                <v-card outlined>
                    <v-card-text>
                        <v-layout wrap align-center>
                            <v-flex xs5>
                                <v-text-field
                                    v-model="filters.name"
                                    @keyup.enter="applyFilter"
                                    prepend-icon="mdi-text-box-search-outline"
                                    label="Buscar por nombre: "
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs2>
                                <v-select
                                    v-model="filters.year"
                                    @keyup.enter="applyFilter"
                                    :items="years"
                                    label="Seleccionar año de proyecto:"
                                ></v-select>
                            </v-flex>
                            <v-flex xs5>
                                <v-autocomplete
                                    v-model="filters.project_type"
                                    @keyup.enter="applyFilter"
                                    label="Seleccionar tipo de proyecto: "
                                    :items="project_types"
                                    item-text="t"
                                    return-object
                                ></v-autocomplete>
                            </v-flex>
                            <v-flex xs6>
                                <v-autocomplete
                                    v-model="filters.teacher"
                                    @keyup.enter="applyFilter"
                                    label="Seleccionar profesor: "
                                    :items="teachers"
                                    item-text="account.nick"
                                    return-object
                                ></v-autocomplete>
                            </v-flex>
                            <v-flex xs4 class="pb-3">
                                <v-btn color="primary" @click="applyFilter"
                                    >Buscar
                                    <v-icon right
                                        >mdi-database-search</v-icon
                                    ></v-btn
                                >
                                <v-btn
                                    class="ml-3"
                                    @click="clearFilter"
                                    depressed
                                    outlined
                                    color="primary"
                                    >Limpiar filtro</v-btn
                                >
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-slide-y-transition>
        <v-flex xs6></v-flex>
        <v-flex xs6 class="d-flex justify-end pt-4 pb-5">
            <v-btn depressed color="primary" @click="createNewProject">
                Crear proyecto
                <v-icon right>mdi-plus</v-icon>
            </v-btn>
        </v-flex>
        <project-table :loading="loading" :table="table"></project-table>
        <v-dialog v-model="modal" width="760px">
            <v-layout wrap>
                <v-flex xs12>
                    <v-card outlined>
                        <v-card-title>Nuevo proyecto</v-card-title>
                        <v-card-text>
                            <project-form
                                @submited="onProjectSubmited"
                            ></project-form>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-dialog>
    </v-layout>
</template>
<script src="./index.ts" lang="ts" />
<style lang="scss" src="./index.scss"></style>
