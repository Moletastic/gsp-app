<template>
    <v-menu :close-on-content-click="false" offset-y
          max-width="290px"
          min-width="290px">
        <template v-slot:activator="{on, attrs}">
            <v-text-field :label="label" readonly v-model="picker" persistent-hint v-bind="attrs" v-on="on" />
        </template>
        <v-time-picker :format="format" v-model="picker" @input="menu=false"></v-time-picker>
    </v-menu>
</template>
<script src='./index.ts' lang='ts'/>