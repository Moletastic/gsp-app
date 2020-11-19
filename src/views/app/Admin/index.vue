<template>
    <v-layout wrap>
        <v-flex xs12 class="mb-5">
            <h1 class="headline">Opciones de administrador</h1>
        </v-flex>
        <v-flex xs12 class="mb-5">
            <v-card outlined>
                <v-card-text class="px-0 py-0">
                    <v-simple-table dense>
                        <template #default>
                            <thead>
                                <tr>
                                    <th class="text-left">Rubricas</th>
                                    <v-btn
                                        color="success"
                                        @click="openRubricModal"
                                        small
                                        outlined
                                        >Agregar
                                        <v-icon small right
                                            >mdi-plus</v-icon
                                        ></v-btn
                                    >
                                </tr>
                            </thead>
                            <tbody>
                                <template
                                    v-if="rubrics && rubrics.length !== 0"
                                >
                                    <tr
                                        v-for="(rubric, index) in rubrics"
                                        :key="index"
                                    >
                                        <td>
                                            {{ rubric.name }}
                                        </td>
                                        <td>
                                            <a
                                                :href="rubric.file_url"
                                                target="_blank"
                                                >{{ rubric.file_url }}</a
                                            >
                                        </td>
                                    </tr>
                                </template>
                                <tr v-else>
                                    <td class="grey--text font-italic">
                                        No registra rubricas
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 class="mb-5">
            <v-card outlined>
                <v-card-text class="px-0 py-0">
                    <v-simple-table dense>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">Estudiantes</th>
                                    <v-btn
                                        color="success"
                                        @click="openStudentModal"
                                        small
                                        outlined
                                        >Agregar
                                        <v-icon right small
                                            >mdi-plus</v-icon
                                        ></v-btn
                                    >
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(student, index) in students"
                                    :key="index"
                                >
                                    <td v-if="student.rut">
                                        {{ student.rut }}
                                    </td>
                                    <td v-else class="grey--text">
                                        No registra rut
                                    </td>
                                    <td>
                                        {{ student.first_name }}
                                        {{ student.last_name }}
                                    </td>
                                    <td v-if="student.career">
                                        {{ student.career.name }}
                                    </td>
                                    <td v-if="student.career">
                                        {{ student.career.code }}
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12>
            <v-dialog v-model="rubric_modal" max-width="720px">
                <v-card>
                    <v-card-title>
                        <span class="body-1"> Nueva Rúbrica</span>
                    </v-card-title>
                    <v-card-text>
                        <rubric-form
                            @submit="$r => onSubmitRubric($r)"
                        ></rubric-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-dialog max-width="960px" v-model="student_modal">
                <student-form @submit="onSubmitStudent"></student-form>
            </v-dialog>
        </v-flex>
    </v-layout>
</template>
<script src="./index.ts" lang="ts" />
