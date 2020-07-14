<template>
  <v-dialog v-model="loading.show" hide-overlay persistent width="400">
    <v-card outlined class="py-2">
      <v-card-text>
        {{loading.message}}
        <v-progress-linear indeterminate color="indigo" class="pt-2 mt-2 mb-0"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script src='./index.ts' lang='ts' />