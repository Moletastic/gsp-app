<template>
  <v-layout wrap>
    <v-flex xs12 >
      <h1 class="headline">Proyectos</h1>
      <v-switch inset label="Búsqueda por filtro" v-model="filtered"></v-switch>
    </v-flex>
    <v-slide-y-transition>
      <v-flex xs12 v-if="filtered">
        <v-card outlined>
          <v-card-text>
            <v-layout wrap align-center>
              <v-flex xs6>
                <v-text-field prepend-icon="mdi-text-box-search-outline" label="Buscar por nombre: "></v-text-field>
              </v-flex>
              <v-flex xs3>
                <v-select :items="states" label="Seleccionar Estado de Proyecto"></v-select>
              </v-flex>
              <v-flex xs3>
                <v-select v-model="filters.year" :items="years" label="Ingresar año de proyecto:"></v-select>
              </v-flex>
              <v-flex xs6>
                <v-autocomplete label="Seleccionar profesor: " :items="teachers" item-text="user.nick" return-object></v-autocomplete>
              </v-flex>
              <v-flex xs1 class="pb-3">
                <v-btn depressed outlined color="primary">Buscar <v-icon right>mdi-database-search</v-icon></v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-slide-y-transition>
    <v-flex xs6></v-flex>
    <v-flex xs6 class="d-flex justify-end pt-4 pb-5">
      <v-btn depressed color="success" @click="createNewProject">
        Crear proyecto
        <v-icon right>mdi-plus</v-icon>
      </v-btn>
    </v-flex>
    <template v-for="(project, index) in projects">
      <v-flex
        xs12
        md4
        :key="project.id"
        :pr-2="index !== projects.length-1"
        pb-2
        @click="goProject(project.id)"
        class="clickable"
      >
        <v-card class="project-preview-card" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">{{project.subjects[0].name}}</div>
              <v-list-item-title class="title mb-1">{{project.title}}</v-list-item-title>
              <v-list-item-subtitle>
                Hecho por:
                <v-chip v-for="(author, index) in project.authors" :key="index">{{author.user.nick}}</v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar color="primary">
              <v-icon color="white">{{project.subjects[0].icon}}</v-icon>
            </v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-btn color="primary" small outlined @click="goProject(project.id)">Revisar</v-btn>
            <v-chip
              class="ml-2"
              small
              color="indigo"
              text-color="white"
              label
            >Reuniones: {{scores[project.id].done_meets}} de {{scores[project.id].meets}}</v-chip>
            <v-chip
              class="ml-2"
              small
              color="indigo"
              text-color="white"
              label
            >Hitos: {{scores[project.id].solved_milestones}} de {{scores[project.id].milestones}}</v-chip>
          </v-card-actions>
        </v-card>
      </v-flex>
    </template>
    <v-dialog v-model="modal" width="760px">
      <v-layout wrap>
        <v-flex xs12>
          <v-card outlined>
            <v-card-title>Nuevo proyecto</v-card-title>
            <v-card-text>
              <project-form @submited="onProjectSubmited"></project-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-dialog>
  </v-layout>
</template>
<script src='./index.ts' lang='ts'/>
<style lang="scss" src="./index.scss">
</style>
