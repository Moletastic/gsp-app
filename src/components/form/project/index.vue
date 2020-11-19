<template>
    <v-container grid-list-md>
        <v-form ref="form">
            <v-layout row wrap>
                <v-flex xs6>
                    <v-text-field
                        label="Ingresar nombre de proyecto: "
                        v-model="form.title"
                        :rules="rules.name"
                    ></v-text-field>
                </v-flex>
                <v-flex xs6></v-flex>
                <v-flex xs6 class="d-flex align-center">
                    <v-select
                        label="Seleccionar tipo:"
                        v-model="form.project_type"
                        :items="project_types"
                        :rules="rules.project_type"
                        item-text="t"
                        return-object
                    ></v-select>
                </v-flex>
                <v-flex xs6 class="d-flex align-center">
                    <v-autocomplete
                        label="Seleccionar tema:"
                        multiple
                        v-model="form.subjects"
                        :items="subjects"
                        item-text="name"
                        :rules="rules.subjects"
                        return-object
                    ></v-autocomplete>
                    <v-btn
                        class="ml-2"
                        outlined
                        x-small
                        color="success"
                        @click="openSubjectModal"
                    >
                        Nuevo
                        <v-icon x-small>mdi-plus</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex xs12 class="d-flex align-center">
                    <v-textarea
                        label="Ingresar una descripción (opcional): "
                        outlined
                        v-model="form.desc"
                    ></v-textarea>
                </v-flex>
                <v-flex xs6 class="d-flex align-center pb-1">
                    <v-autocomplete
                        :items="teachers"
                        v-model="form.guides"
                        :rules="rules.guides"
                        chips
                        multiple
                        label="Seleccionar profesores: "
                        item-text="account.nick"
                        return-object
                    ></v-autocomplete>
                </v-flex>
                <v-flex xs6 class="d-flex align-center pb-1">
                    <v-autocomplete
                        :items="students"
                        v-model="form.authors"
                        chips
                        multiple
                        :rules="rules.authors"
                        label="Seleccionar estudiantes: "
                        :item-text="s => s.first_name + ' ' + s.last_name"
                        return-object
                    ></v-autocomplete>
                </v-flex>
                <v-flex xs6>
                    <v-card outlined>
                        <v-card-title>
                            <span class="body-1">
                                <v-icon>mdi-clipboard-list</v-icon>Hitos
                            </span>
                        </v-card-title>
                        <v-card-text>
                            <v-layout wrap>
                                <v-slide-y-transition group>
                                    <v-flex
                                        xs12
                                        v-for="(milestone,
                                        index) in form.milestones"
                                        :key="index"
                                    >
                                        <v-layout wrap>
                                            <v-flex xs6>
                                                <v-text-field
                                                    v-model="milestone.title"
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs5>
                                                <date-field
                                                    @change="
                                                        $e =>
                                                            onChangeDateMilestone(
                                                                $e,
                                                                milestone.id
                                                            )
                                                    "
                                                    :date="milestone.date"
                                                ></date-field>
                                            </v-flex>
                                            <v-flex xs1>
                                                <v-btn
                                                    fab
                                                    small
                                                    depressed
                                                    color="white"
                                                    @click="
                                                        removeMilestone(
                                                            milestone.id
                                                        )
                                                    "
                                                >
                                                    <v-icon small color="error"
                                                        >mdi-delete</v-icon
                                                    >
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                </v-slide-y-transition>
                                <v-flex xs12>
                                    <v-btn
                                        outlined
                                        block
                                        color="success"
                                        @click="addEmptyMilestone"
                                        small
                                    >
                                        Agregar hito
                                        <v-icon small right>mdi-plus</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs1></v-flex>
                <v-flex xs4>
                    <time-line :items="timelineItems"></time-line>
                </v-flex>
                <v-flex xs12>
                    <v-card outlined>
                        <v-card-title>
                            <span class="body-1">
                                <v-icon>mdi-link</v-icon>Links
                            </span>
                        </v-card-title>
                        <v-card-text>
                            <v-layout wrap>
                                <template v-for="(link, index) in form.links">
                                    <v-flex xs12 :key="index">
                                        <link-form
                                            :types="linktypes"
                                            :form="link"
                                        ></link-form>
                                    </v-flex>
                                </template>
                                <v-flex xs12>
                                    <v-btn
                                        outlined
                                        block
                                        small
                                        color="success"
                                        @click="addEmptyLink"
                                    >
                                        Agregar link
                                        <v-icon right small>mdi-plus</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12 class="d-flex justify-end">
                    <v-btn
                        @click="onSubmit"
                        depressed
                        color="primary"
                        class="mt-2 white--text"
                        :loading="load"
                    >
                        Guardar
                        <v-icon right>mdi-content-save</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex xs12>
                    <v-dialog max-width="960px" v-model="student_modal">
                        <v-card>
                            <v-card-title>
                                <span class="body-1">
                                    <v-chip small color="success"
                                        ><v-icon small>mdi-plus</v-icon></v-chip
                                    >
                                    Nuevo estudiante</span
                                >
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text class="mt-5">
                                <student-form></student-form>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-flex>
                <v-flex xs12>
                    <v-dialog max-width="960px" v-model="subject_modal">
                        <subject-form @submit="onSubmitSubject"></subject-form>
                    </v-dialog>
                </v-flex>
                <v-flex xs12>
                    <v-dialog max-width="960px" v-model="teacher_modal">
                        <v-card>
                            <v-card-title>
                                <span class="body-1">
                                    <v-chip small color="success"
                                        ><v-icon small>mdi-plus</v-icon></v-chip
                                    >
                                    Nuevo profesor</span
                                >
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text class="mt-5">
                                <teacher-form></teacher-form>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>
<script src="./index.ts" lang="ts" />
