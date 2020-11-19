<template>
    <v-layout wrap>
        <v-flex xs8 pb-5 v-if="!loading.active">
            <h1>
                <v-avatar v-if="project.subjects[0]" color="primary">
                    <v-icon color="white">{{
                        project.subjects[0].icon
                    }}</v-icon>
                </v-avatar>
                Proyecto: {{ project.title }}
                <v-btn small icon
                    ><v-icon small @click="openEdit"
                        >mdi-border-color</v-icon
                    ></v-btn
                >
            </h1>
            <v-card class="my-2" v-show="project.desc" outlined>
                <v-card-text class="font-italic">{{
                    project.desc
                }}</v-card-text>
            </v-card>
            <h2 class="body-2 pt-2">
                Autor:
                <template v-for="(author, index) in project.authors">
                    <v-chip
                        :key="index"
                        small
                        label
                        close
                        @click:close="removeStudent(author)"
                        class="clickable primary mr-2"
                        >{{ author.full_name }}</v-chip
                    >
                </template>
                <v-btn icon small @click="selectStudents"
                    ><v-icon small>mdi-plus</v-icon></v-btn
                >
            </h2>
            <h2 class="body-2 pt-2">
                Guía:
                <template v-for="(guide, index) in project.guides">
                    <v-chip
                        :key="index"
                        small
                        label
                        close
                        @click:close="removeTeacher(guide)"
                        class="clickable primary mr-2"
                        >{{ guide.account.nick }}</v-chip
                    >
                </template>
                <v-btn icon small @click="selectTeachers"
                    ><v-icon small>mdi-plus</v-icon></v-btn
                >
            </h2>
            <h2 class="body-2 pt-2">
                Temas:
                <v-chip
                    label
                    class="primary mr-2"
                    small
                    v-for="(subject, index) in project.subjects"
                    :key="index"
                    >{{ subject.name }}</v-chip
                >
            </h2>
        </v-flex>
        <v-flex xs9>
            <state-switch
                v-if="project.project_state"
                @change="$e => onChangeState($e)"
                :state="project.project_state"
                :loading="load"
            ></state-switch>
        </v-flex>
        <v-flex xs8 class="mb-5">
            <v-card outlined>
                <v-card-text class="px-0 py-0">
                    <v-simple-table dense>
                        <template #default>
                            <thead>
                                <tr>
                                    <th class="text-left">Links</th>
                                    <v-btn
                                        class="my-2 mr-2"
                                        color="success"
                                        @click="addLink"
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
                                <template v-if="project.links.length !== 0">
                                    <tr
                                        v-for="(link, index) in project.links"
                                        :key="index"
                                    >
                                        <td>
                                            <v-icon small class="mr-2">{{
                                                link.link_type.icon
                                            }}</v-icon>
                                            <a
                                                :href="link.url"
                                                target="_blank"
                                                >{{ link.url }}</a
                                            >
                                        </td>
                                        <td>
                                            <v-btn
                                                icon
                                                @click="removeLink(link)"
                                                small
                                                :loading="load"
                                            >
                                                <v-icon small
                                                    >mdi-delete</v-icon
                                                >
                                            </v-btn>
                                        </td>
                                    </tr>
                                </template>
                                <tr v-else>
                                    <td class="grey--text font-italic">
                                        Sin Links Registrados
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs8 class="mb-5">
            <v-card outlined>
                <v-card-text class="px-0 py-0">
                    <v-simple-table dense>
                        <template #default>
                            <thead>
                                <tr>
                                    <th class="text-left">Evaluaciones</th>
                                    <v-btn
                                        color="success"
                                        @click="addReview"
                                        small
                                        class="my-2 mr-2"
                                        outlined
                                        >Agregar
                                        <v-icon right small
                                            >mdi-plus</v-icon
                                        ></v-btn
                                    >
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="project.reviews.length !== 0">
                                    <tr
                                        v-for="(review,
                                        index) in project.reviews"
                                        :key="index"
                                    >
                                        <td>
                                            {{ review.name }}
                                        </td>
                                        <td>
                                            {{ review.score }}
                                        </td>
                                        <td>
                                            {{ review.comment }}
                                        </td>
                                        <td>
                                            <a
                                                :href="review.file_url"
                                                target="_blank"
                                                >Ir a Evaluación</a
                                            >
                                        </td>
                                        <td>
                                            <v-btn
                                                depressed
                                                @click="removeReview(review)"
                                                icon
                                                x-small
                                                :loading="load"
                                            >
                                                <v-icon small
                                                    >mdi-delete</v-icon
                                                >
                                            </v-btn>
                                        </td>
                                    </tr>
                                </template>
                                <tr v-else>
                                    <td class="grey--text font-italic">
                                        Sin Evaluaciones Registradas
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs8>
            <v-layout wrap>
                <v-flex xs12>
                    <v-tabs v-model="tab" :icons-and-text="true">
                        <v-tab :href="`#tab-1`">
                            Todo
                            <v-icon>mdi-view-dashboard-variant-outline</v-icon>
                        </v-tab>
                        <v-tab-item :value="'tab-1'">
                            <v-card class="mt-2" outlined>
                                <v-card-text>
                                    <milestones-table
                                        :project_id="project.id"
                                        :table="milestonesTable"
                                    ></milestones-table>
                                </v-card-text>
                            </v-card>
                            <v-card class="mt-2" outlined>
                                <v-card-text>
                                    <meet-table
                                        :project_id="project.id"
                                        :table="meetsTable"
                                    ></meet-table>
                                </v-card-text>
                            </v-card>
                            <v-card class="mt-2" outlined>
                                <v-card-text>
                                    <commit-table
                                        :project_id="project.id"
                                        :table="commitsTable"
                                    ></commit-table>
                                </v-card-text>
                            </v-card>
                            <v-card class="mt-2" outlined>
                                <v-card-text>
                                    <progress-table
                                        :project_id="project.id"
                                        :table="progressTable"
                                    ></progress-table>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab :href="`#tab-2`">
                            Hitos
                            <v-icon>mdi-clipboard-list</v-icon>
                        </v-tab>
                        <v-tab-item :value="'tab-2'">
                            <v-card class="mt-2" outlined>
                                <v-card-text>
                                    <milestones-table
                                        :project_id="project.id"
                                        :table="milestonesTable"
                                    ></milestones-table>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab :href="`#tab-3`">
                            Reuniones
                            <v-icon>mdi-calendar</v-icon>
                        </v-tab>
                        <v-tab-item :value="'tab-3'">
                            <v-card class="mt-2" outlined>
                                <v-card-text>
                                    <meet-table
                                        :project_id="project.id"
                                        :table="meetsTable"
                                    ></meet-table>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab :href="'#tab-4'">
                            Acuerdos
                            <v-icon>mdi-handshake</v-icon>
                        </v-tab>
                        <v-tab-item :value="'tab-4'" class="mt-2" outlined>
                            <v-card class="mt-2" outlined>
                                <v-card-text>
                                    <commit-table
                                        :project_id="project.id"
                                        :table="commitsTable"
                                    ></commit-table>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab :href="'#tab-5'">
                            Progresos
                            <v-icon>mdi-layers-plus</v-icon>
                        </v-tab>
                        <v-tab-item :value="'tab-5'" class="mt-2" outlined>
                            <v-card class="mt-2" outlined>
                                <v-card-text>
                                    <progress-table
                                        :project_id="project.id"
                                        :table="progressTable"
                                    ></progress-table>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs4>
            <time-line :items="tlitems"></time-line>
        </v-flex>
        <v-layout wrap justify-center>
            <v-dialog v-model="student_modal" width="560px">
                <v-card>
                    <v-card-title>
                        Agregando autor
                    </v-card-title>
                    <v-card-text>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-select
                                    :items="students_selection"
                                    v-model="student_selected"
                                    label="Seleccionar estudiante: "
                                    :item-text="
                                        s => s.first_name + ' ' + s.last_name
                                    "
                                    return-object
                                ></v-select>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="addStudent"
                            >Agregar al proyecto</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="teacher_modal" width="560px">
                <v-card>
                    <v-card-title>
                        Agregando Docente Guía
                    </v-card-title>
                    <v-card-text>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-select
                                    :items="teachers_selection"
                                    v-model="teacher_selected"
                                    label="Seleccionar profesor: "
                                    :item-text="g => g.full_name"
                                    return-object
                                ></v-select>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="addTeacher"
                            >Agregar al proyecto</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="form_modal" width="560px">
                <v-card>
                    <v-card-title>
                        Titulo y Descripción de proyecto
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="patch-form">
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field
                                        label="Ingresar nuevo titulo: "
                                        v-model="form.title"
                                        :rules="rules.title"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea
                                        outlined
                                        label="Ingresar nueva descripción: "
                                        v-model="form.desc"
                                    ></v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="patchProject" color="primary"
                            >Guardar</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="link_modal" width="760px">
                <v-card>
                    <v-card-title>
                        Agregando Enlace
                    </v-card-title>
                    <v-card-text>
                        <v-layout wrap>
                            <project-link-form
                                @change="onLinkSubmit"
                                :link="link_form"
                            ></project-link-form>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-dialog v-model="review_modal" width="760px">
                <v-card>
                    <v-card-title>
                        Agregando Evaluación
                    </v-card-title>
                    <v-card-text>
                        <v-layout wrap>
                            <review-form
                                @change="onReviewSubmit"
                                :review="review_form"
                            ></review-form>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-layout>
        <loading-bar :loading="loading"></loading-bar>
    </v-layout>
</template>
<script src="./index.ts" lang="ts" />
<style lang="scss" src="./index.scss"></style>
