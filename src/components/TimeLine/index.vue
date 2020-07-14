<template>
  <v-timeline>
    <v-timeline-item fill-dot v-for="(event, index) in events" :key="index">
      <template v-slot:icon>
        <v-avatar>
          <v-icon v-text="icons[event.type]" color="white"></v-icon>
        </v-avatar>
      </template>
      <v-card>
        <v-card-title class="title">{{event.title}}</v-card-title>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
<script src='./index.ts' lang='ts'/>