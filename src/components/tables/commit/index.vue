<template>
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
    <template v-slot:item.limit_date="{ item }">
      <v-chip>{{moment(item.limit_date).format("DD MMMM - HH:mm")}}</v-chip>
    </template>
    <template v-slot:item._actions="{}">
      <v-btn outlined color="indigo" small>revisar</v-btn>
    </template>
  </v-data-table>
</template>
<script src='./index.ts' lang='ts'/>