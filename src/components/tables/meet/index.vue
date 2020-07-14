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
    <template v-slot:item.done="{item}">
      <v-icon
        :color="item.done ? 'green' : 'grey'"
        v-text="item.done ? 'mdi-check-bold' : 'mdi-power-sleep'"
      ></v-icon>
    </template>
    <template v-slot:item.channel="{ item }">
      <v-chip color="white
      ">
        <v-avatar left>
          <v-img width="10px" :src="item.channel.icon"></v-img>
        </v-avatar>
        {{item.channel.name}}
      </v-chip>
    </template>
    <template v-slot:item.date="{ item }">
      <v-chip>
        {{moment(item.date).format("DD MMMM - HH:mm")}}
      </v-chip>
    </template>
    <template v-slot:item._actions="{item}">
      <v-btn outlined color="indigo" small @click="onCheckDetail(item)">revisar</v-btn>
    </template>
  </v-data-table>
    </v-flex>
    <v-flex xs12>
      <v-dialog v-model="modal" width="760px">
        <v-card outlined>
          <v-card-title>Reunión: {{meet.name}}</v-card-title>
          <v-card-text>
            <meet-form :disabled="true" :form="meet" :channels="channels"></meet-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>
<script src='./index.ts' lang='ts'/>