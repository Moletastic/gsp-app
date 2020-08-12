<template>
    <v-layout wrap>
        <v-flex xs12 pb-5 v-if="!loading.active">
            <h1>
                <v-avatar color="primary">
                    <v-icon color="white">{{
                        project.subjects[0].icon
                    }}</v-icon>
                </v-avatar>
                Proyecto: {{ project.title }}
            </h1>
            <h2 class="body-2 pt-2">
                Autor:
                <template v-for="(author, index) in project.authors">
                    <v-chip
                        :key="index"
                        small
                        label
                        @click="checkAuthor(author.id)"
                        class="clickable primary mr-2"
                        >{{ author.user.nick }}</v-chip
                    >
                </template>
            </h2>
            <h2 class="body-2 pt-2">
                Guía:
                <template v-for="(guide, index) in project.guides">
                    <v-chip
                        :key="index"
                        small
                        label
                        @click="checkTeacher(guide.id)"
                        class="clickable primary mr-2"
                        >{{ guide.user.nick }}</v-chip
                    >
                </template>
            </h2>
            <h2 class="body-2 pt-2">
                Temas:
                <v-chip
                    label
                    class="primary"
                    small
                    v-for="(subject, index) in project.subjects"
                    :key="index"
                    >{{ subject.name }}</v-chip
                >
            </h2>
            <h2 class="body-2 pt-2">
                Tags:
                <v-chip
                    label
                    class="grey white--text mr-1"
                    small
                    close
                    v-for="(tag, index) in project.tags"
                    :key="index"
                    >{{ tag }}</v-chip
                >
                <v-btn class="ml-2 green" depressed fab x-small
                    ><v-icon small color="white">mdi-plus</v-icon></v-btn
                >
            </h2>
        </v-flex>
        <v-flex xs4 align-self-center>
            Estado de Proyecto: {{ fmt[project.state] }}
        </v-flex>
        <v-flex xs4 align-self-center>
            <v-layout wrap v-if="project.state === 'IN_PROGRESS'">
                <v-flex xs12>
                    <v-btn small @click="changeState('PRESENTED')"
                        >Presentar
                        <v-icon small class="ml-2"
                            >mdi-arrow-right-circle</v-icon
                        ></v-btn
                    >
                </v-flex>
            </v-layout>
            <v-layout wrap v-if="project.state === 'PRESENTED'">
                <v-flex xs12>
                    <v-btn small @click="changeState('CHECKED')"
                        >Revisar
                        <v-icon small class="ml-2"
                            >mdi-arrow-right-circle</v-icon
                        ></v-btn
                    >
                </v-flex>
            </v-layout>
            <v-layout wrap v-if="project.state === 'CHECKED'">
                <v-flex xs12>
                    <v-btn
                        @click="changeState('APPROVED')"
                        class="mr-2"
                        color="green"
                        small
                        >Aprobar
                        <v-icon small class="ml-2">mdi-check</v-icon></v-btn
                    >
                    <v-btn @click="changeState('REJECTED')" color="red" small
                        >Rechazar
                        <v-icon small class="ml-2">mdi-close</v-icon></v-btn
                    >
                </v-flex>
            </v-layout>
            <v-layout wrap v-if="project.state === 'APPROVED'">
                <v-flex xs12>
                    <v-btn small @click="changeState('IN_PROGRESS2')"
                        >Pasar a semestre 2
                        <v-icon small class="ml-2"
                            >mdi-arrow-right-circle</v-icon
                        ></v-btn
                    >
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs8 class="mb-5">
            <v-card outlined>
                <v-card-text class="px-0 py-0">
                    <v-simple-table dense>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">Links</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(link, index) in project.links"
                                    :key="index"
                                >
                                    <td>
                                        <v-icon small class="mr-2">{{
                                            link.type.icon
                                        }}</v-icon>
                                        <a :href="link.url" target="_blank">{{
                                            link.url
                                        }}</a>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs4></v-flex>
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
                                        :table="milestonesTable"
                                    ></milestones-table>
                                </v-card-text>
                            </v-card>
                            <v-card class="mt-2" outlined>
                                <v-card-text>
                                    <meet-table
                                        :table="meetsTable"
                                    ></meet-table>
                                </v-card-text>
                            </v-card>
                            <v-card class="mt-2" outlined>
                                <v-card-text>
                                    <commit-table
                                        :table="commitsTable"
                                    ></commit-table>
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
                                        :table="commitsTable"
                                    ></commit-table>
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
        <v-layout row justify-center>
            <v-dialog v-model="userDetails" :max-width="650">
                <json-viewer
                    :verbose="'user'"
                    :entity="'students'"
                    :entity_id="selected_entity_id"
                ></json-viewer>
            </v-dialog>
        </v-layout>
        <v-layout row justify-center>
            <v-dialog v-model="teacherDetails" :max-width="650">
                <json-viewer
                    :verbose="'user'"
                    :entity="'teachers'"
                    :entity_id="selected_entity_id"
                ></json-viewer>
            </v-dialog>
        </v-layout>
        <loading-bar :loading="loading"></loading-bar>
    </v-layout>
</template>
<script src="./index.ts" lang="ts" />
<style lang="scss" src="./index.scss"></style>
