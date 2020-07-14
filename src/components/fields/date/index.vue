<template>
  <v-menu
    :close-on-content-click="false"
    offset-y
    max-width="290px"
    min-width="290px"
    :disabled="disabled"
  >
    <template v-slot:activator="{on, attrs}">
      <v-text-field :disabled="disabled" :outlined="outlined" :label="label" v-model="date_str" persistent-hint v-bind="attrs" v-on="on" />
    </template>
    <v-date-picker :disabled="disabled" @input="menu=false" no-title v-model="picker"></v-date-picker>
  </v-menu>
</template>
<script src='./index.ts' lang='ts'/>