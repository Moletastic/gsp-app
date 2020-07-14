<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-text-field :disabled="disabled" outlined :label="disabled?'Nombre':'Ingresar nombre: '" v-model="form.title"></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-textarea :disabled="disabled" outlined v-model="form.desc" :label="disabled?'Descripción':'Ingresar descripción: '"></v-textarea>
    </v-flex>
    <v-flex xs12>
      <v-text-field :disabled="disabled" outlined :label="disabled?'URL':'Ingresar URL de entregable: '" v-model="form.file_url"></v-text-field>
    </v-flex>
    <v-flex xs12>
      <date-field :disabled="disabled" :label="disabled?'Fecha de entrega':'Ingresar fecha de entrega: '" :date="form.limit_date"></date-field>
    </v-flex>
    <v-flex xs12>
      <v-switch :disabled="disabled" label="Resuelto " color="green" inset v-model="form.solved"></v-switch>
    </v-flex>
  </v-layout>
</template>
<script src='./index.ts' lang='ts'/>