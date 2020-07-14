<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-data-table
        :headers="table.headers"
        :items="table.data"
        :footer-props="{
                  'itemsPerPageText' : table.rowsPerPageText
              }"
      >
        <template v-slot:item.solved="{item}">
          <v-icon
            :color="item.solved ? 'green' : 'grey'"
            v-text="item.solved ? 'mdi-check-bold' : 'mdi-power-sleep'"
          ></v-icon>
        </template>
        <template v-slot:item.date="{ item }">
          <v-chip>{{moment(item.date).format("DD MMMM - HH:mm")}}</v-chip>
        </template>
        <template v-slot:item._actions="{item}">
          <v-btn outlined color="indigo" small @click="onCheckDetail(item)">revisar</v-btn>
        </template>
      </v-data-table>
    </v-flex>
    <v-flex xs12>
      <v-dialog v-model="modal" width="720px">
        <v-card outlined>
          <v-card-title>Hito: {{milestone.title}}</v-card-title>
          <v-card-text>
            <milestone-form :disabled="true" :form="milestone"></milestone-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>
<script src='./index.ts' lang='ts'/>