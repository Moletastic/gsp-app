<template>
  <v-data-table :headers="headers" :items="items" class="elevation-1">
    <template v-slot:item.name="{item}">
      {{item.name}}
    </template>
    <template v-slot:item.type="{item}">
      <v-chip>{{types[item.type]}}</v-chip>
    </template>
    <template v-slot:item.details="{item}">
        <v-checkbox v-if="item.type==='agreement'" v-model="item.solved" label="Resuelto"></v-checkbox>
        <v-chip label v-if="item.type==='meet'">
            <v-avatar-left class="pr-2">
                 <v-img :src="meetplace[item.place]" width="25px"></v-img>
            </v-avatar-left>
            <div>
                <b>{{item.place}}</b>
            </div>
        </v-chip>
        <v-chip v-if="item.type==='progress'" :color="item.uploaded ? 'green' : 'grey'">
            {{item.uploaded ? 'Subido' : 'No Subido'}}
        </v-chip>
    </template>
  </v-data-table>
</template>
<script src='./index.ts' lang='ts'/>