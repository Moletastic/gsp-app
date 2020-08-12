<template>
  <v-container grid-list-md>
    <v-form>
      <v-layout row wrap>
        <v-flex xs6>
          <v-text-field label="Ingresar nombre de proyecto: " v-model="form.title"></v-text-field>
        </v-flex>
        <v-flex xs6 class="d-flex align-center">
          <v-select
            label="Seleccionar tema:"
            multiple
            v-model="form.subjects"
            :items="subjects"
            item-text="name"
            return-object
          ></v-select>
          <v-btn class="ml-2" outlined x-small color="success">
            Nuevo
            <v-icon x-small>mdi-plus</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs6 class="d-flex align-center pb-1">
          <v-select
            :items="students"
            v-model="form.authors"
            chips
            multiple
            label="Seleccionar estudiantes: "
            item-text="user.nick"
            return-object
          ></v-select>
          <v-btn class="ml-2 mr-1" outlined x-small color="success" @click="student_modal = true">
            Nuevo
            <v-icon x-small>mdi-plus</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs6 class="d-flex align-center pb-1">
          <v-select
            :items="teachers"
            v-model="form.guides"
            chips
            multiple
            label="Seleccionar profesores: "
            item-text="user.nick"
            return-object
          ></v-select>
          <v-btn class="ml-2" outlined x-small color="success" @click="teacher_modal = true">
            Nuevo
            <v-icon x-small>mdi-plus</v-icon>
          </v-btn>
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
                  <v-flex xs12 v-for="(milestone, index) in form.milestones" :key="index">
                  <v-layout wrap>
                    <v-flex xs6>
                      <v-text-field v-model="milestone.title"></v-text-field>
                    </v-flex>
                    <v-flex xs5>
                      <date-field
                        @change="($e) => onChangeDateMilestone($e, milestone.id)"
                        :date="milestone.date"
                      ></date-field>
                    </v-flex>
                    <v-flex xs1>
                      <v-btn
                        fab
                        small
                        depressed
                        color="white"
                        @click="removeMilestone(milestone.id)"
                      >
                        <v-icon small color="red lighten-2">mdi-delete</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
                </v-slide-y-transition>
                <v-flex xs12>
                  <v-btn outlined block color="green lighten-2" @click="addEmptyMilestone">
                    Agregar hito
                    <v-icon>mdi-plus</v-icon>
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
                    <link-form :types="linktypes" :form="link"></link-form>
                  </v-flex>
                </template>
                <v-flex xs12>
                  <v-btn outlined block color="green" @click="addEmptyLink">
                    Agregar link
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="Ingresar etiqueta:"
            persistent-hint
            hint="Oprimir enter para añadir más etiquetas"
            outlined
            @keyup.enter="enterTag"
            v-model="tag"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 class="pt-0">
          <v-slide-x-transition group>
            <v-chip
              close
              @click:close="removeTag(tag)"
              class="mr-2"
              v-for="(tag, index) in tags"
              :key="index"
            >{{tag}}</v-chip>
          </v-slide-x-transition>
        </v-flex>
        <v-flex xs12 class="d-flex justify-end">
          <v-btn @click="onSubmit" depressed color="green" class="mt-2 white--text">
            Guardar
            <v-icon right>mdi-content-save</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-dialog max-width="960px" v-model="student_modal">
            <v-card>
              <v-card-title>
                <span class="body-1"> <v-chip small color="success"><v-icon small>mdi-plus</v-icon></v-chip> Nuevo estudiante</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="mt-5">
                <student-form></student-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-flex>
        <v-flex xs12>
          <v-dialog max-width="960px" v-model="teacher_modal">
            <v-card>
              <v-card-title>
                <span class="body-1"> <v-chip small color="success"><v-icon small>mdi-plus</v-icon></v-chip> Nuevo profesor</span>
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
<script src='./index.ts' lang='ts'/>
